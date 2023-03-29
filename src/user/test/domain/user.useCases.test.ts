import bcrypt from 'bcryptjs';
import { CreateRequest, InvalidRequest } from '@/base/domain/base.requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';
import { LoginRequest, UserEntity, UserUseCase } from '@/user/domain';


const userRepository = {
	create: jest.fn(),
	getByEmail: jest.fn(),
	getById: jest.fn(),
};

describe('UserUseCase', () => {
	let userUseCase: UserUseCase;
	beforeEach(() => {
		userUseCase = new UserUseCase(userRepository);
		jest.clearAllMocks();
	});
	describe('create', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'email is invalid',
				parameter: 'email',
			});

			const result = await userUseCase.create(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const request = new CreateRequest<UserEntity>({
				id: '',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			userRepository.getByEmail.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await userUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a conflict when an email is already registered', async () => {
			const request = new CreateRequest<UserEntity>({
				id: '',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			userRepository.getByEmail.mockResolvedValue({
				id: '',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			const result = await userUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.CONFLICT);
			expect(result.value).toEqual({
				message: 'email already registered',
			});
		});
		test('should return a response success with the user created', async () => {
			const request = new CreateRequest<UserEntity>({
				id: '',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: 'Jose123456',
			});
			const createdUser = {
				id: '1',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
			};
			userRepository.getByEmail.mockResolvedValue(null);
			userRepository.create.mockResolvedValue(createdUser);
			const result = await userUseCase.create(request);
			console.log(result.value);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual(createdUser);
		});
	});
	describe('login', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'email empty',
				parameter: 'email',
			});

			const result = await userUseCase.login(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const request = new LoginRequest({
				id: '',
				email: 'mata649@hotmail.com',
				name: '',
				password: 'Jose123456',
			});
			userRepository.getByEmail.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await userUseCase.login(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with an invalid credentials error when an email does not exist', async () => {
			const request = new LoginRequest({
				id: '',
				email: 'mata649@hotmail.com',
				name: '',
				password: 'Jose123456',
			});
			userRepository.getByEmail.mockResolvedValue(null);
			const result = await userUseCase.login(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.INVALID_CREDENTIALS);
			expect(result.value).toEqual({
				message: 'invalid credentials',
			});
		});
		test('should return a response success with the user when login is valid', async () => {
			const request = new LoginRequest({
				id: '',
				email: 'mata649@hotmail.com',
				name: '',
				password: 'Jose123456',
			});
			const hashedPassword = bcrypt.hashSync(
				'Jose123456',
				bcrypt.genSaltSync()
			);
			userRepository.getByEmail.mockResolvedValue({
				id: '1',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
				password: hashedPassword,
			});

			const result = await userUseCase.login(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual({
				id: '1',
				email: 'mata649@hotmail.com',
				name: 'Jose Alberto Mata Mena',
			});
		});
	});
});
