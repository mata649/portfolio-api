import { UserEntity } from 'portfolio/entities';
import { CreateRequest, InvalidRequest } from './request';
export class LoginRequest {
	constructor(public value: UserEntity) {}
}

export class UserRequest {
	private isValidEmail = (email: string): boolean => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		return emailRegex.test(email);
	};

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
}
