import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/others/middleware.interface';

export class IsUserMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user.role === 'user') {
			return next();
		}
		res.status(401).send({ err: 'Вы не авторизованы' });
	}
}
