import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

export interface IMiddleware {
	execute: (req: FastifyRequest, res: FastifyReply, next: HookHandlerDoneFunction) => void;
}
