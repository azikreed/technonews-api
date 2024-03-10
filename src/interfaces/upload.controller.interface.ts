import { NextFunction, Request, Response } from 'express';

export interface IUploadController {
	createUpload: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
