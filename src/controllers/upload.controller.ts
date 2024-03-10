import { inject, injectable } from 'inversify';
import { IUploadController } from '../interfaces/upload/upload.controller.interface';
import { BaseController } from './base.controller';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/helpers/logger.interface';
import { Request, Response, NextFunction } from 'express';
import { IUploadService } from '../interfaces/upload/upload.service.interface';
import { IConfigService } from '../interfaces/helpers/config.interface';
import multer, { memoryStorage, Multer } from 'multer';
import { UploadMiddleware } from '../middlewares/upload.middleware';
import { HTTPError } from '../helpers/errors/http-error.class';

@injectable()
export class UploadController extends BaseController implements IUploadController {
	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.UploadService) private uploadService: IUploadService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/create',
				func: this.createUpload,
				method: 'post',
				middlewares: [new UploadMiddleware()],
			},
		]);
	}

	async createUpload(req: Request, res: Response, next: NextFunction): Promise<void> {
		const bucketName = this.configService.get('BUCKET_NAME');
		const fileOriginName = req.file?.originalname;
		const bufferName = req.file?.buffer;
		if (!fileOriginName || !bufferName) {
			return next(new HTTPError(400, 'Не существует fileOriginName или bufferName'));
		}
		const result = await this.uploadService.create(bucketName, fileOriginName, bufferName);
		if (!result) {
			return next(new HTTPError(410, 'Ошибка при создании upload'));
		}
		this.ok(res, { id: result._id, data: result.data });
	}
}
