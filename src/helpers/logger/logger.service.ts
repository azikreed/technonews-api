import Fastify, { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { ILogger } from '../../interfaces/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public fastify: FastifyInstance;
	public logger: FastifyBaseLogger;

	constructor() {
		this.fastify = Fastify({
			logger: true,
		});
		this.logger = this.fastify.log;
	}

	log(...args: unknown[]): void {
		this.logger.info({ ...args });
	}

	error(...args: unknown[]): void {
		this.logger.error({ ...args });
	}

	warn(...args: unknown[]): void {
		this.logger.warn({ ...args });
	}
}
