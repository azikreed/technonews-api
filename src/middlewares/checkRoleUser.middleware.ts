import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from '../interfaces/others/middleware.interface';

export class CheckRoleUser implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		const { role } = req.body;
		if (role !== 'admin' && role !== 'journalist') {
			return next();
		} else {
			res.status(401).send({ err: 'Вы не являетесь админом!' });
		}
	}
}
