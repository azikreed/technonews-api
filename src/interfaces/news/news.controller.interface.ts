import { NextFunction, Request, Response } from 'express';

export interface INewsController {
	createNews: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	viewIncrement: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
