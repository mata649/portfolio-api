import { UserRepository } from '../repositories/user';
import { ResponseFailure, ResponseSuccess, ResponseTypes } from '../response';
import bcrypt from 'bcryptjs';
import {
	CreateRequest,
	InvalidRequest,
	LoginRequest,
} from 'portfolio/requests';
import { UserEntity } from 'portfolio/entities';
export class UserUseCase {
	/**
	 * Constructs a new UserUseCase.
	 * @param userRepository - A repository of user entities.
	 */
	constructor(private readonly userRepository: UserRepository) {}
	/**
	 * Hashes a password using bcrypt.
	 * @param password - The password to hash.
	 * @returns The hashed password.
	 */
	private hashPassword(password: string): string {
		const salt = bcrypt.genSaltSync();
		const passwordHashed = bcrypt.hashSync(password, salt);
		return passwordHashed;
	}
	/**
	 * Creates a new user in the repository.
	 * @param request - A CreateRequest object containing the user to create or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the created user if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
	async create(
		request: InvalidRequest | CreateRequest<UserEntity>
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const user = request.value;
		try {
			if (await this.userRepository.getByEmail(user.email)) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'email already registered'
				);
			}
			user.password = this.hashPassword(user.password);

			const userCreated = await this.userRepository.create(user);

			return new ResponseSuccess(ResponseTypes.CREATED, {
				email: userCreated.email,
				id: userCreated.id,
				name: userCreated.email,
			});
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'server error'
			);
		}
	}
	/**
	 * Authenticates an User in the repository and returns a response
	 * depending if the transaction could be made successfuly or not
	 * @param {LoginUserDto} userDto - Object with information to authenticate the user in the repository
	 * @returns {Promise<ResponseSuccess | ResponseFailure>} - Response with the information of the transaction
	 */
	async login(
		request: LoginRequest | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const user = request.value;
		try {
			const userFound = await this.userRepository.getByEmail(user.email);
			if (!userFound) {
				return new ResponseFailure(
					ResponseTypes.INVALID_CREDENTIALS,
					'invalid credentials'
				);
			}
			if (!bcrypt.compareSync(user.password, userFound.password)) {
				return new ResponseFailure(
					ResponseTypes.INVALID_CREDENTIALS,
					'invalid credentials'
				);
			}

			return new ResponseSuccess(ResponseTypes.OK, {
				email: userFound.email,
				id: userFound.id,
				name: userFound.email,
			});
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
