import { BaseRepository } from '@/base/domain/base.repository';
import {
	CreateRequest,
	DeleteRequest,
	GetByIdRequest,
	GetRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
import { BaseUseCase } from '@/base/domain/base.useCases';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';

interface Testing {
	id: string;
	name: string;
	age: number;
}
type TestingRepository = BaseRepository<Testing>;

const repositoryMock = {
	create: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	delete: jest.fn(),
	update: jest.fn(),
};

describe('BaseUseCase', () => {
	let baseUseCase: BaseUseCase<Testing, TestingRepository>;
	beforeEach(() => {
		baseUseCase = new BaseUseCase<Testing, TestingRepository>(
			repositoryMock,
			'testing object'
		);
		jest.clearAllMocks();
	});
	describe('create', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({ error: 'name empty', parameter: 'name' });

			const result = await baseUseCase.create(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'name empty',
						parameter: 'name',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const createRequest = new CreateRequest<Testing>({
				age: 20,
				id: '1',
				name: 'Jose',
			});
			repositoryMock.create.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await baseUseCase.create(createRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response success with the object created ', async () => {
			const createRequest = new CreateRequest<Testing>({
				age: 20,
				id: '1',
				name: 'Jose',
			});
			repositoryMock.create.mockResolvedValue(createRequest.value);
			const result = await baseUseCase.create(createRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual(createRequest.value);
		});
	});
	describe('get', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'limit out of range, limit has to be more than 0 and less than 1000',
				parameter: 'limit',
			});

			const result = await baseUseCase.get(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});

		test('should return a response failure with a system error when an error happens', async () => {
			const getRequest = new GetRequest<Testing>({
				filters: { name: 'Alice' },
				limit: 10,
				page: 1,
				orderBy: [],
			});
			repositoryMock.get.mockRejectedValue(
				new Error('something went wrong')
			);
			const result = await baseUseCase.get(getRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response success with the object found ', async () => {
			const getRequest = new GetRequest<Testing>({
				filters: { name: 'Alice' },
				limit: 10,
				page: 1,
				orderBy: [],
			});
			const expectedObject: Testing = {
				name: 'Alice',
				age: 22,
				id: '1',
			};
			repositoryMock.get.mockResolvedValue(expectedObject);
			const result = await baseUseCase.get(getRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedObject);
		});
	});
	describe('getById', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'invalid id',
				parameter: 'id',
			});

			const result = await baseUseCase.getById(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});

		test('should return a response failure with a system error when an error happens', async () => {
			const getRequest = new GetByIdRequest('1');
			repositoryMock.getById.mockRejectedValue(
				new Error('something went wrong')
			);
			const result = await baseUseCase.getById(getRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with resource error when the object does not exist ', async () => {
			const getRequest = new GetByIdRequest('1');

			repositoryMock.getById.mockResolvedValue(null);
			const result = await baseUseCase.getById(getRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'testing object does not exist',
			});
		});
		test('should return a response success with the object found ', async () => {
			const getRequest = new GetByIdRequest('1');
			const expectedObject: Testing = {
				name: 'Alice',
				age: 22,
				id: '1',
			};
			repositoryMock.getById.mockResolvedValue(expectedObject);
			const result = await baseUseCase.getById(getRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedObject);
		});
	});
	describe('update', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'invalid id',
				parameter: 'id',
			});

			const result = await baseUseCase.update(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});

		test('should return a response failure with a system error when an error happens', async () => {
			const updateRequest = new UpdateRequest<Testing>({
				age: 2,
				id: '1',
				name: '',
			});
			repositoryMock.update.mockRejectedValue(
				new Error('something went wrong')
			);
			const result = await baseUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with resource error when the object does not exist ', async () => {
			const updateRequest = new UpdateRequest<Testing>({
				age: 2,
				id: '1',
				name: '',
			});

			repositoryMock.getById.mockResolvedValue(null);
			const result = await baseUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'testing object does not exist',
			});
		});
		test('should return a response success with the object updated ', async () => {
			const updateRequest = new UpdateRequest<Testing>({
				age: 2,
				id: '1',
				name: '',
			});

			const expectedObject: Testing = {
				name: 'Alice',
				age: 22,
				id: '1',
			};
			repositoryMock.getById.mockResolvedValue({
				...expectedObject,
				age: 22,
			});

			repositoryMock.update.mockResolvedValue(expectedObject);

			const result = await baseUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedObject);
		});
	});
	describe('delete', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'invalid id',
				parameter: 'id',
			});

			const result = await baseUseCase.delete(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: invalidRequest.errors,
			});
		});

		test('should return a response failure with a system error when an error happens', async () => {
			const deleteRequest = new DeleteRequest('1');
			repositoryMock.delete.mockRejectedValue(
				new Error('something went wrong')
			);
			const result = await baseUseCase.delete(deleteRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with resource error when the object does not exist ', async () => {
			const deleteRequest = new DeleteRequest('1');

			repositoryMock.getById.mockResolvedValue(null);
			const result = await baseUseCase.delete(deleteRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'testing object does not exist',
			});
		});
		test('should return a response success with the object deleted ', async () => {
			const deleteRequest = new DeleteRequest('1');

			const expectedObject: Testing = {
				name: 'Alice',
				age: 22,
				id: '1',
			};

			repositoryMock.getById.mockResolvedValue(expectedObject);
			repositoryMock.delete.mockResolvedValue(expectedObject);

			const result = await baseUseCase.delete(deleteRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedObject);
		});
	});
});
