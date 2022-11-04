import { Request, Response } from 'express';
import { CreateUserDto, LoginUserDto, UserEntity } from '../../domain/entities/user';
import { ResponseTypes } from '../../domain/response';
import { UserUseCase } from '../../domain/useCases';
import { generateJWT } from '../auth/jwt';

export class UserController {
	constructor(private userUseCase: UserUseCase) {}

	create = async (req: Request, res: Response) => {
		const user: CreateUserDto = {
			email: req.body.email,
			name: req.body.name,
			password: req.body.password,
		};
		const response = await this.userUseCase.create(user);

		res.status(response.type).json(response.value);
	};

	login = async (req: Request, res: Response) => {
		const user: LoginUserDto = {
			email: req.body.email,
			password: req.body.password,
		};
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
