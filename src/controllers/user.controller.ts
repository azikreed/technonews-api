import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.interface';
import { IUserController } from '../interfaces/user.controller.interface';
import { IUserService } from '../interfaces/user.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);

		this.bindRoutes([]);
	}
}
