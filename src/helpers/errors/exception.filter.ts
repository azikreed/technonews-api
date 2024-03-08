import { inject } from 'inversify';
import { TYPES } from '../../types';
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { HTTPError } from './http-error.class';
import { IExceptionFilter } from '../../interfaces/exception.filter.interface';
import { ILogger } from '../../interfaces/logger.interface';

export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ExceptionFilter) private logger: ILogger) {}

	catch(
		err: Error | HTTPError,
		request: FastifyRequest,
		reply: FastifyReply,
		next: HookHandlerDoneFunction,
	): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
		} else {
			this.logger.error(`${err.message}`);
			reply.status(500).send({ err: err.message });
		}
	}
}
