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
import { NewsCreateDto, NewsUpdateDto } from '../services/dto/news.dto';
import { CheckAccessToCreate } from '../middlewares/checkAcccesNews';
import { IPagination } from '../interfaces/others/pagination.interface';

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
				middlewares: [new ValidateMiddleware(NewsCreateDto), new CheckAccessToCreate()],
			},
			{
				path: '/update/:id',
				method: 'patch',
				func: this.update,
				middlewares: [new ValidateMiddleware(NewsUpdateDto), new CheckAccessToCreate()],
			},
			{
				path: '/view/:id',
				method: 'get',
				func: this.viewIncrement,
				middlewares: [],
			},
			{
				path: '/get',
				method: 'get',
				func: this.getAll,
				middlewares: [],
			},
			{
				path: '/delete/:id',
				method: 'delete',
				func: this.delete,
				middlewares: [],
			},
			{
				path: '/most',
				method: 'get',
				func: this.mostViewed,
				middlewares: [],
			},
		]);
	}

	async createNews(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.newsService.create(req.body);
			if (!result) {
				return next(new HTTPError(422, 'Ошибка при создании эту новость', 'create news'));
			}
			this.ok(res, result);
		} catch (e) {
			this.send(res, 422, 'Ошибка при создании');
		}
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
			this.ok(res, news);
		}
		this.ok(res, result);
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		let { limit, page } = req.query;

		page = page || '1';
		limit = limit || '10';
		const size = Number(limit);
		const skip = (Number(page) - 1) * size;

		const result = await this.newsService.findAll({ skip, size });
		if (!result?.length) {
			return next(new HTTPError(404, 'Новостей не существует', 'get all news'));
		}
		this.ok(res, result);
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.newsService.update(req.params.id, {
			...req.body,
			updatedAt: new Date(),
		});
		if (!result) {
			return next(new HTTPError(422, 'Не удалось обновить эту новость', 'delete news'));
		}
		this.ok(res, result);
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.newsService.delete(req.params.id);
		if (!result) {
			return next(new HTTPError(422, 'Не удалось удалить эту новость', 'delete news'));
		}
		this.ok(res, result);
	}

	async mostViewed(req: Request, res: Response, next: NextFunction): Promise<void> {
		const limit = Number(req.query?.limit) || 5;
		const result = await this.newsService.mostViewed(limit);
		if (!result) {
			return next(new HTTPError(422, 'Не удалось найти новостей', 'most viewed news'));
		}
		this.ok(res, result);
	}
}
