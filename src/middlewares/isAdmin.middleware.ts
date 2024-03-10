import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/middleware.interface';

export class IsAdminMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user.role === 'admin') {
			return next();
		}
		res.status(401).send({ err: 'Вы не являетесь админом!' });
	}
}
