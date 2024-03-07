import { FastifyBaseLogger } from 'fastify';

export interface ILogger {
	logger: FastifyBaseLogger;
	log: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
}
