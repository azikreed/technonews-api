import { inject, injectable } from 'inversify';
import { ICategoryController } from '../interfaces/category/category.controller.interface';
import { IConfigService } from '../interfaces/helpers/config.interface';
import { ILogger } from '../interfaces/helpers/logger.interface';
import { TYPES } from '../types';
import { BaseController } from './base.controller';
import { NextFunction, Request, Response } from 'express';
import { ICategoryService } from '../interfaces/category/category.service.interface';
import { HTTPError } from '../helpers/errors/http-error.class';
import { INewsService } from '../interfaces/news/news.service.interface';

@injectable()
export class CategoryController extends BaseController implements ICategoryController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.CategoryService) private categoryService: ICategoryService,
		@inject(TYPES.NewsService) private newsService: INewsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				method: 'post',
				func: this.createCategory,
				middlewares: [],
			},
			{
				path: '/delete/:id',
				method: 'delete',
				func: this.deleteCategory,
				middlewares: [],
			},
			{
				path: '/get',
				method: 'get',
				func: this.getAll,
				middlewares: [],
			},
		]);
	}

	async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.categoryService.create(req.body);
			if (!result) {
				return next(new HTTPError(422, 'Ошибка при создании категорию', 'create category'));
			}
			this.ok(res, result);
		} catch (e) {
			this.send(res, 422, 'Ошибка при создании');
		}
	}

	async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const checkExist = await this.newsService.findByCategory(id);
			console.log(checkExist);
			if (checkExist?.length) {
				return next(new HTTPError(422, 'Нельзя удалить категории с новостями', 'delete category'));
			}
			const result = await this.categoryService.delete(id);
			if (!result) {
				return next(new HTTPError(422, 'Ошибка при удалении категорию', 'delete category'));
			}
			this.ok(res, result);
		} catch (e) {
			this.send(res, 422, 'Ошибка при создании');
		}
	}

	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.categoryService.find();
		if (!result) {
			return next(new HTTPError(422, 'Ошибка при получении категории', 'delete category'));
		}
		this.ok(res, result);
	}
}
