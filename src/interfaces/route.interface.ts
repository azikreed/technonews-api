import { FastifyRequest, FastifyReply } from 'fastify';
import { IMiddleware } from './middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: FastifyRequest, reply: FastifyReply) => void;
	method: 'get' | 'post' | 'delete' | 'patch' | 'put';
	middlewares?: IMiddleware[];
}

export type FastifyReturnType = FastifyReply<any>;
