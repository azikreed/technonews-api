import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './interfaces/helpers/logger.interface';
import { json } from 'body-parser';
import { IExceptionFilter } from './interfaces/helpers/exception.filter.interface';
import 'reflect-metadata';
import { IConfigService } from './interfaces/helpers/config.interface';
import { MongoService } from './services/db.service';
import { UserController } from './controllers/user.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import cors from 'cors';
import { IMinioService } from './interfaces/others/minio.service.interface';
import { UploadController } from './controllers/upload.controller';
import { NewsController } from './controllers/news.controller';
import session from 'express-session';
@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.MongoService) private mongoService: MongoService,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.MinioService) private minioService: IMinioService,
		@inject(TYPES.UploadController) private uploadController: UploadController,
		@inject(TYPES.NewsController) private newsController: NewsController,
	) {
		this.app = express();
		this.port = Number(this.configService.get('PORT'));
	}

	useMiddleware(): void {
		this.app.use(json());
		this.app.use(cors());
		this.app.use(
			session({
				secret: this.configService.get('SESSION_KEY'),
				resave: false,
				saveUninitialized: true,
			}),
		);
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/user', this.userController.router);
		this.app.use('/upload', this.uploadController.router);
		this.app.use('/news', this.newsController.router);
	}

	useExceptionFilters(): void {}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.minioService.connect();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server has been started on http://localhost:${this.port}`);
	}

	public close(): void {
		this.mongoService.disconnect();
		this.server.close();
	}
}
