import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/middleware.interface';

export class IsJournalistMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.user.role === 'journalist') {
			return next();
		}
		res.status(401).send({ err: 'Вы не авторизованы' });
	}
}
