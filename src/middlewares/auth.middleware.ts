import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '../interfaces/others/middleware.interface';
import { verify, JwtPayload } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
				console.log(payload);
				if (err) {
					next();
				} else if (isJwtPayload(payload)) {
					req.user = {
						id: payload.id,
						role: payload.role,
					};
					next();
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
}

function isJwtPayload(obj: any): obj is JwtPayload {
	return typeof obj === 'object' && obj !== null && 'id' in obj && 'role' in obj;
}
