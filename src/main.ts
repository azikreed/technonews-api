import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/helpers/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './helpers/logger/logger.service';
import { IExceptionFilter } from './interfaces/helpers/exception.filter.interface';
import { ExceptionFilter } from './helpers/errors/exception.filter';
import { App } from './app';
import { IConfigService } from './interfaces/helpers/config.interface';
import { ConfigService } from './helpers/config/config.service';
import { MongoService } from './services/db.service';
import { UserController } from './controllers/user.controller';
import { IUserController } from './interfaces/user/user.controller.interface';
import { UserService } from './services/user.service';
import { IUserService } from './interfaces/user/user.service.interface';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from './interfaces/user/user.repository.interface';
import { MinioService } from './services/minio.service';
import { IMinioService } from './interfaces/others/minio.service.interface';
import { UploadController } from './controllers/upload.controller';
import { IUploadController } from './interfaces/upload/upload.controller.interface';
import { UploadService } from './services/upload.service';
import { IUploadService } from './interfaces/upload/upload.service.interface';
import { UploadRepository } from './repositories/upload.repository';
import { IUploadRepository } from './interfaces/upload/upload.repository.interface';
import { NewsService } from './services/news.service';
import { INewsService } from './interfaces/news/news.service.interface';
import { INewsRepository } from './interfaces/news/news.repository.interface';
import { NewsRepository } from './repositories/news.repository';
import { NewsController } from './controllers/news.controller';
import { INewsController } from './interfaces/news/news.controller.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
	bind<IMinioService>(TYPES.MinioService).to(MinioService).inSingletonScope();
	bind<IUploadController>(TYPES.UploadController).to(UploadController);
	bind<IUploadService>(TYPES.UploadService).to(UploadService).inSingletonScope();
	bind<IUploadRepository>(TYPES.UploadRepository).to(UploadRepository).inSingletonScope();
	bind<INewsController>(TYPES.NewsController).to(NewsController);
	bind<INewsService>(TYPES.NewsService).to(NewsService).inSingletonScope();
	bind<INewsRepository>(TYPES.NewsRepository).to(NewsRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { app, appContainer };
}

export const boot = bootstrap();
