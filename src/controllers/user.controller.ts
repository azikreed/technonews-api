import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/helpers/logger.interface';
import { IUserController } from '../interfaces/user/user.controller.interface';
import { IUserService } from '../interfaces/user/user.service.interface';
import { JwtPayload, sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../helpers/errors/http-error.class';
import { IConfigService } from '../interfaces/helpers/config.interface';
import { verify } from 'jsonwebtoken';
import { CheckRoleUser } from '../middlewares/checkRoleUser.middleware';
import { IsAdminMiddleware } from '../middlewares/isAdmin.middleware';
import { AuthGuard } from '../middlewares/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new CheckRoleUser()],
			},
			{
				path: '/admin',
				method: 'post',
				func: this.register,
				middlewares: [new AuthGuard(), new IsAdminMiddleware()],
			},
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [],
			},
			{
				path: '/refresh',
				method: 'post',
				func: this.refresh,
				middlewares: [],
			},
		]);
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.userService.createUser(req.body);
			if (!result) {
				return next(new HTTPError(422, 'Такой пользователь уже существует', 'register'));
			}
			this.ok(res, result);
		} catch (e) {
			this.send(res, 422, 'Ошибка при регистрации');
		}
	}

	async login({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.userService.getUser(body?.email);
		if (!result) {
			return next(new HTTPError(401, 'ошибка авторизации', 'login'));
		}
		const data = {
			id: result.id,
			role: result.role,
		};
		const accessToken = await this.signJWT(data, this.configService.get('ACCESS'), '15m');

		const refreshToken = await this.signJWT(data, this.configService.get('REFRESH'), '7d');

		this.ok(res, { accessToken, refreshToken });
	}

	async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { refreshToken } = req.body;

		try {
			const decoded = verify(refreshToken, this.configService.get('REFRESH')) as JwtPayload;
			const data = {
				id: decoded.id,
				role: decoded.role,
			};

			const accessToken = await this.signJWT(data, this.configService.get('ACCESS'), '15m');
			this.ok(res, { accessToken });
		} catch (e) {
			this.send(res, 400, 'Invalid request');
			this.loggerService.error('[RefreshToken] there is a problem with refreshing token');
		}
	}

	private signJWT(
		data: { id: string; role: string },
		secret: string,
		expire: string,
	): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign({ ...data }, secret, { expiresIn: expire }, (err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token as string);
			});
		});
	}
}
