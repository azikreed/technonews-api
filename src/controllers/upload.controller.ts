import { inject, injectable } from 'inversify';
import { IUploadController } from '../interfaces/upload/upload.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/helpers/logger.interface';
import { Request, Response, NextFunction } from 'express';
import { IUploadService } from '../interfaces/upload/upload.service.interface';
import { IConfigService } from '../interfaces/helpers/config.interface';
import { UploadMiddleware } from '../middlewares/upload.middleware';
import { HTTPError } from '../helpers/errors/http-error.class';

@injectable()
export class UploadController extends BaseController implements IUploadController {
	private bucketName: string;
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UploadService) private uploadService: IUploadService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bucketName = this.configService.get('BUCKET_NAME');
		this.bindRoutes([
			{
				path: '/create',
				func: this.createUpload,
				method: 'post',
				middlewares: [new UploadMiddleware()],
			},
			{
				path: '/delete/:id',
				func: this.deleteUpload,
				method: 'post',
				middlewares: [],
			},
			{
				path: '/get',
				func: this.getUploads,
				method: 'get',
				middlewares: [],
			},
		]);
	}

	async createUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
		const fileOriginName = req.file?.originalname;
		const bufferName = req.file?.buffer;
		if (!fileOriginName || !bufferName) {
			return next(new HTTPError(400, 'Не существует fileOriginName или bufferName'));
		}
		const result = await this.uploadService.create(this.bucketName, fileOriginName, bufferName);
		if (!result) {
			return next(new HTTPError(410, 'Ошибка при создании upload'));
		}
		this.ok(res, { id: result._id, data: result.data });
	}

	async deleteUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
		const upload = await this.uploadService.find(req.params.id);
		if (!upload?.data) {
			return next(new HTTPError(400, 'Не существует fileOriginName'));
		}
		const result = await this.uploadService.delete(this.bucketName, upload?.data, req.params.id);
		if (!result) {
			return next(new HTTPError(410, 'Ошибка при удалении upload'));
		}
		this.ok(res, result);
	}

	async getUploads(req: Request, res: Response, next: NextFunction): Promise<void> {
		const uploads = await this.uploadService.findAll();
		if (!uploads) {
			return next(new HTTPError(422, 'Ошибка при получении uploads', 'get all uploads'));
		}
		this.ok(res, uploads);
	}
}
