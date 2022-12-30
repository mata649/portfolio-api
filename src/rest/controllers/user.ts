import { Request, Response } from 'express';
import { UserEntity, createUserEntity } from 'portfolio/entities';
import { UserRepository } from 'portfolio/repositories';
import { UserRequest } from 'portfolio/requests';
import { ResponseTypes } from 'portfolio/response';
import { UserUseCase } from 'portfolio/useCases';
import { generateJWT } from 'rest/auth/jwt';

export class UserController {
	userUseCase: UserUseCase
	userRequest:UserRequest
	constructor(userRepository: UserRepository) {
		this.userUseCase = new UserUseCase(userRepository);
		this.userRequest = new UserRequest()
	}

	create = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const requestObject = this.userRequest.create(user);
		const response = await this.userUseCase.create(requestObject);

		res.status(response.type).json(response.value);
	};

	login = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const requestObject = this.userRequest.create(user);
		const response = await this.userUseCase.login(requestObject);
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
