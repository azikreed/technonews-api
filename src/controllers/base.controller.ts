import { FastifyReply, FastifyRequest, RouteOptions, HookHandlerDoneFunction } from 'fastify';
import { ILogger } from '../interfaces/logger.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { FastifyReturnType, IControllerRoute } from '../interfaces/route.interface';

@injectable()
export abstract class BaseController {
	private readonly _routes: RouteOptions[] = [];
	private readonly logger: ILogger;

	constructor(@inject(TYPES.LoggerService) logger: ILogger) {
		this.logger = logger;
	}

	public get routes(): RouteOptions[] {
		return this._routes;
	}

	public send<T>(reply: FastifyReply, code: number, message: T): FastifyReturnType {
		reply.type('application/json');
		return reply.status(code).send(message);
	}

	public ok<T>(reply: FastifyReply, message: T): FastifyReturnType {
		return this.send<T>(reply, 200, message);
	}

	public created(reply: FastifyReply): FastifyReturnType {
		return reply.code(201).send();
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);

			const handler = (request: FastifyRequest, reply: FastifyReply): void =>
				route.func.call(this, request, reply);

			const fastifyRoute: RouteOptions = {
				method: route.method,
				url: route.path,
				preHandler: route.middlewares?.map((m) => m.execute.bind(m)),
				handler,
			};

			this._routes.push(fastifyRoute);
		}
	}
}
