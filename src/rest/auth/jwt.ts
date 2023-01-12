import { UserEntity } from 'portfolio/entities/user';
import { Config } from 'config';

import jwt from 'jsonwebtoken';
export interface JwtPayload {
	id: string;
	name: string;
}

const config = Config.loadConfig();

/**
 * Generates a JWT token

 * @param id - id of the user
 * @param name - name of the user
 * @returns Returns a promise that resolves with the JWT token or
 *      rejected if there is an error
 */
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
