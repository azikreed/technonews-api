import { inject } from 'inversify';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.interface';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { IUserController } from '../interfaces/user.controller.interface';

export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.LoggerService) private loggerService: ILogger) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register.bind(this),
				middlewares: [],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login.bind(this),
				middlewares: [],
			},
			{
				path: '/refresh',
				method: 'post',
				func: this.refresh.bind(this),
				middlewares: [],
			},
		]);
	}

	async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {}
	async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {}
	async refresh(request: FastifyRequest, reply: FastifyReply): Promise<void> {}
}
