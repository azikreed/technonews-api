import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export interface IExceptionFilter {
	catch: (
		err: Error,
		request: FastifyRequest,
		reply: FastifyReply,
		next: HookHandlerDoneFunction,
	) => void;
}
