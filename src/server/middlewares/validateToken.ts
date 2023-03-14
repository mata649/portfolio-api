import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Config } from '@/config';

export const validateToken = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	const token = req.header('Authorization');

	const config = Config.loadConfig();
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No token in the request',
		});
	}

	try {
		const { id, name }: JwtPayload = jwt.verify(
			token,
			config.JWT_SECRET_SEED
		) as JwtPayload;

		req.currentUser = {
			id,
			name,
		};
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: 'Token is not valid',
		});
	}

	next();
};
