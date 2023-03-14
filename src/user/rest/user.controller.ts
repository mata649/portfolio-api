import { Request, Response } from 'express';

import { ResponseTypes } from '@/base/domain/response';

import { generateJWT } from '@/server/auth/jwt';
import {
	createUserEntity,
	UserEntity,
	UserRepository,
	UserRequest,
	UserUseCase,
} from '../domain';

/**
 * Class that handle CRUD and login operations for the user entities,
 * It instantiate the UserUseCase and UserRequest classes to handle the use cases and requests.
 *
 */
export class UserController {
	userUseCase: UserUseCase;

	userRequest: UserRequest;

	/**
	 * Creates a new UserRequest instance, and assign them to the corresponding properties
	 *
	 * @param userRepository - Repository for the user entities
	 */
	constructor(userRepository: UserRepository) {
		this.userUseCase = new UserUseCase(userRepository);
		this.userRequest = new UserRequest();
	}

	/**
	 * This method handles the creation of a new instance of user, using data from the request body.
	 * It creates a request object using the userRequest's create method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 *
	 * @param  req - express Request object
	 * @param res - express Response object
	 */
	create = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const requestObject = this.userRequest.create(user);
		const response = await this.userUseCase.create(requestObject);

		res.status(response.type).json(response.value);
	};

	/**
	 * This method handles the login of a user, using data from the request body.
	 * It creates a request object using the userRequest's login method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 *
	 * @param  req - express Request object
	 * @param res - express Response object
	 */
	login = async (req: Request, res: Response) => {
		const user = createUserEntity(req.body);
		const requestObject = this.userRequest.login(user);
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
