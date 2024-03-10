import multer, { Multer, memoryStorage } from 'multer';
import { IMiddleware } from '../interfaces/others/middleware.interface';
import { NextFunction, Request, Response } from 'express';

export class UploadMiddleware implements IMiddleware {
	upload: Multer;

	constructor() {
		this.upload = multer({ storage: memoryStorage() });
	}

	execute(req: Request, res: Response, next: NextFunction): void {
		this.upload.single('file')(req, res, next);
	}
}
