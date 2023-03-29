import { CreateRequest, InvalidRequest } from '@/base/domain/base.requests';
import { createUserEntity, LoginRequest, UserRequest } from '@/user/domain';

describe('UserRequest', () => {
	let userRequest: UserRequest;
	beforeEach(() => {
		userRequest = new UserRequest();
	});
	describe('create', () => {
		test('should return a CreateRequest when user is valid', () => {
			const item = createUserEntity({
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			const result = userRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return a InvalidRequest when name is less than 4 characters', () => {
			const item = createUserEntity({
				email: 'mata649@hotmail.com',
				name: 'Jos',
				password: 'Jose123456',
			});
			const result = userRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual([{
					error: "name is less than 4 characters",
					parameter: "name"
				}]);
			}
		});
		test('should return a InvalidRequest when password is less than 8 characters', () => {
			const item = createUserEntity({
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: '12312',
			});
			const result = userRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual([{
					error: "password is less than 8 characters",
					parameter: "password"
				}]);
			}
		});
		test('should return a InvalidRequest when email is invalid', () => {
			const item = createUserEntity({
				email: 'mata649@',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			const result = userRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual([{
					error: "email is not valid",
					parameter: "email"
				}]);
			}
		});
	});
	describe('login', () => {
		test('should return a CreateRequest when user is valid', () => {
			const item = createUserEntity({
				email: 'mata649@hotmail.com',
				password: 'Jose123456',
			});
			const result = userRequest.login(item);
			expect(result).toBeInstanceOf(LoginRequest);
			if (result instanceof LoginRequest) {
				expect(result.value).toEqual(item);
			}
		});

		test('should return a InvalidRequest when password is an empty string', () => {
			const item = createUserEntity({
				email: 'mata649@hotmail.com',
				password: '',
			});
			const result = userRequest.login(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual([{
					error: "password empty",
					parameter: "password"
				}]);
			}
		});
		test('should return a InvalidRequest when email is invalid', () => {
			const item = createUserEntity({
				email: 'mata649@',
				password: 'Jose123456',
			});
			const result = userRequest.login(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual([{
					error: "email is not valid",
					parameter: "email"
				}]);
			}
		});
	});

});
