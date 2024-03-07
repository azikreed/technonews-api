import Fastify, { FastifyInstance } from 'fastify';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { IConfigService } from './interfaces/config.interface';
import { ILogger } from './interfaces/logger.interface';
import 'reflect-metadata';

@injectable()
export class App {
	app: FastifyInstance;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.app = Fastify();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddleware(): void {}

	useRoutes(): void {}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.server = this.app.server.listen(this.port);
		this.loggerService.log(`Server started on port ${this.port}`);
	}

	public close(): void {
		this.server.close();
	}
}
