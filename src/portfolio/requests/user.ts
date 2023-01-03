import { UserEntity } from 'portfolio/entities';
import { CreateRequest, InvalidRequest } from './request';

/**
 * Class representing a valid login request
 */
export class LoginRequest {
	constructor(public value: UserEntity) {}
}
/**
 * Class used to validate the user's requests
 */
export class UserRequest {
	/**
	 *  Validates if a string is a valid email
	 * @param color - String to validate
	 * @returns If the string is a valid email, returns `true`, else `false`
	 */
	private isValidEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailRegex.test(email);
	};
	/**
	 * Validates if the properties of an object meets the requirements to create an user
	 * @param item - Object to be validated
	 * @returns If the object meets the requirements, returns a `CreateRequest` object, else returns an `InvalidRequest` object
	 */
	create = (user: UserEntity): CreateRequest<UserEntity> | InvalidRequest => {
		const invalidRequest = new InvalidRequest();
		if (user.name.length < 4) {
			invalidRequest.addError({ error: 'name empty', parameter: 'name' });
		}

		if (user.password.length < 8) {
			invalidRequest.addError({
				error: 'password is less than 8 characters',
				parameter: 'password',
			});
		}
		if (!this.isValidEmail(user.email)) {
			invalidRequest.addError({
				error: 'email is not valid',
				parameter: 'email',
			});
		}
		user.email.toLowerCase();
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new CreateRequest<UserEntity>(user);
	};

	/**
	 * Validates if the properties of an object meets the requirements to login an user
	 * @param item - Object to be validated
	 * @returns If the object meets the requirements, returns a `LoginRequest` object, else returns an `InvalidRequest` object
	 */
	login = (user: UserEntity): CreateRequest<UserEntity> | InvalidRequest => {
		const invalidRequest = new InvalidRequest();
		if (user.password.length < 1) {
			invalidRequest.addError({
				error: 'password empty',
				parameter: 'password',
			});
		}
		if (!this.isValidEmail(user.email)) {
			invalidRequest.addError({
				error: 'email is not valid',
				parameter: 'email',
			});
		}
		user.email.toLowerCase();
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new LoginRequest(user);
	};
}
