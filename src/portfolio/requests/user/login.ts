import { UserEntity } from 'portfolio/entities';
import { InvalidRequest } from '../invalidRequest';

export class LoginUserRequest {
	constructor(public value: UserEntity) {}
}

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailRegex.test(email);
};

export const buildLoginUserRequest = (
	user: UserEntity
): LoginUserRequest | InvalidRequest => {
	const invalidRequest = new InvalidRequest();
	if (user.password.length < 8) {
		invalidRequest.addError({
			error: 'password is less than 8 characters',
			parameter: 'password',
		});
	}
	if (!isValidEmail(user.email)) {
		invalidRequest.addError({
			error: 'email is not valid',
			parameter: 'email',
		});
	}
	user.email.toLowerCase();
	if (invalidRequest.hasErrors()) {
		return invalidRequest;
	}
	return new LoginUserRequest(user);
};
