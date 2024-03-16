import { NextFunction, Request, Response } from 'express';

export interface ICategoryController {
	createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getOne: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
