import { FastifyReply, FastifyRequest } from 'fastify';

export interface IUserController {
	register: (request: FastifyRequest, reply: FastifyReply) => void;
	login: (request: FastifyRequest, reply: FastifyReply) => void;
	refresh: (request: FastifyRequest, reply: FastifyReply) => void;
}
