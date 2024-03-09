import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './helpers/logger/logger.service';
import { IExceptionFilter } from './interfaces/exception.filter.interface';
import { ExceptionFilter } from './helpers/errors/exception.filter';
import { App } from './app';
import { IConfigService } from './interfaces/config.interface';
import { ConfigService } from './helpers/config/config.service';
import { MongoService } from './services/db.service';
import { UserController } from './controllers/user.controller';
import { IUserController } from './interfaces/user.controller.interface';
import { UserService } from './services/user.service';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from './interfaces/user.repository.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	// bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
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
