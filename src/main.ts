import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './interfaces/logger.interface';
import { TYPES } from './types';
import { LoggerService } from './helpers/logger/logger.service';
import { App } from './app';
import 'reflect-metadata';
import { ConfigService } from './helpers/config/config.service';
import { IConfigService } from './interfaces/config.interface';
import { UserController } from './controllers/user.controller';
import { IUserController } from './interfaces/user.controller.interface';

const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
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
