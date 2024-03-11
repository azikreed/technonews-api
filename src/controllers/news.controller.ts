import { NextFunction, Request, Response } from 'express';
import { INewsController } from '../interfaces/news/news.controller.interface';
import { BaseController } from './base.controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/helpers/logger.interface';
import { IConfigService } from '../interfaces/helpers/config.interface';
import { INewsService } from '../interfaces/news/news.service.interface';
import { HTTPError } from '../helpers/errors/http-error.class';
import { ValidateMiddleware } from '../middlewares/validate.middleware';
import { NewsCreateDto } from '../services/dto/news-create.dto';
import { NewsModel } from '../models/News';

@injectable()
export class NewsController extends BaseController implements INewsController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.NewsService) private newsService: INewsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.createNews,
				middlewares: [new ValidateMiddleware(NewsCreateDto)],
			},
			{
				path: '/view/:id',
				method: 'post',
				func: this.viewIncrement,
				middlewares: [],
			},
		]);
	}

	async createNews(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.newsService.create(req.body);
		console.log('CONTROLLER ============= ', result);
		if (!result) {
			return next(new HTTPError(422, 'Ошибка при создании эту новость', 'create news'));
		}
		this.ok(res, result);
	}

	async viewIncrement(req: Request, res: Response, next: NextFunction): Promise<void> {
		const newsId = req.params.id;
		const sessionId = req.sessionID;

		const news = await this.newsService.find(newsId);

		if (!news) {
			return next(new HTTPError(404, 'Такая новость не существует', 'view increment'));
		}

		let result;

		if (!news.uniqueViews.includes(sessionId)) {
			news.views += 1;
			news.uniqueViews.push(sessionId);
			const update = { ...news, updatedAt: new Date() };
			result = await this.newsService.update(newsId, update);
		}
		if (!result) {
			this.send<string>(res, 422, 'Этот пользователь уже посещал эту страницу');
		}
		this.ok(res, result);
	}
}
