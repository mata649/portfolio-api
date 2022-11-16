import { Request, Response } from 'express';
import {UserEntity, createUserEntity } from 'portfolio/entities';
import { ResponseTypes } from 'portfolio/response';
import { UserUseCase } from 'portfolio/useCases';
import { generateJWT } from 'rest/auth/jwt';

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