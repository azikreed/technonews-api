import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/others/middleware.interface';

export class CheckAccessToCreate implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user?.role === 'admin' || req.user?.role == 'journalist') {
			return next();
		} else {
			res.status(401).send({ err: 'Вы не являетесь админом!' });
		}
	}
}
