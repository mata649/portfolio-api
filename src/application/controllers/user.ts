import { Request, Response } from 'express';
import {UserEntity, createUserEntity } from 'domain/entities/user';
import { ResponseTypes } from 'domain/response';
import { UserUseCase } from 'domain/useCases';
import { generateJWT } from 'application/auth/jwt';

export class UserController {
	constructor(private userUseCase: UserUseCase) {}

	create = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const response = await this.userUseCase.create(user);

		res.status(response.type).json(response.value);
	};

	login = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const response = await this.userUseCase.login(user);
		if (response.type === ResponseTypes.OK) {
			const user = response.value as UserEntity;
			res.status(response.type).json({
				...user,
				jwt: await generateJWT(user.id, user.name),
			});
		} else {
			res.status(response.type).json(response.value);
		}
	};
}
