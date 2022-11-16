import { UserEntity } from 'portfolio/entities/user';
import { Config } from 'config';

import jwt from 'jsonwebtoken';
export interface JwtPayload {
	id: string;
	name: string;
}

const config = Config.loadConfig();
export const generateJWT = (id: UserEntity['id'], name: UserEntity['name']) => {
	return new Promise((resolve, reject) => {
		const payload: JwtPayload = { id, name };

		jwt.sign(
			payload,
			config.JWT_SECRET_SEED,
			{
				expiresIn: '8000h',
			},
			(err, token) => {
				if (err) {
					console.error(err);
					reject('Error generating JWT');
				}

				resolve(token);
			}
		);
	});
};
