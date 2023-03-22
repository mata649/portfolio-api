import {
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';
import { createCategoryEntity } from '@/category/domain';
import { ProjectEntity, ProjectUseCase } from '@/project/domain';

const projectRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	update: jest.fn(),
};

const categoryRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	update: jest.fn(),
};

describe('ProjectUseCase', () => {
	let projectUseCase: ProjectUseCase;
	beforeEach(() => {
		projectUseCase = new ProjectUseCase(
			projectRepositoryMock,
			categoryRepositoryMock
		);
		jest.clearAllMocks();
	});
	describe('create', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'name empty',
				parameter: 'name',
			});

			const result = await projectUseCase.create(invalidRequest);
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
			const request = new CreateRequest<ProjectEntity>({
				id: '',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			categoryRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await projectUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the category was not found', async () => {
			const request = new CreateRequest<ProjectEntity>({
				id: '',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			categoryRepositoryMock.getById.mockResolvedValue(null);
			const result = await projectUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'category does not exist',
			});
		});
		test('should return a response success with the project created when post content is created', async () => {
			const request = new CreateRequest<ProjectEntity>({
				id: '',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const categoryFound = createCategoryEntity({
				id: '1',
				color: '#FFFFFF',
				name: 'Data Engineering',
			});

			categoryRepositoryMock.getById.mockResolvedValue(categoryFound);
			projectRepositoryMock.create.mockResolvedValue({
				...request.value,
				id: '1',
			});

			const result = await projectUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual({ ...request.value, id: '1' });
		});
	});
	describe('update', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'id empty',
				parameter: 'id',
			});

			const result = await projectUseCase.update(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'id empty',
						parameter: 'id',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const request = new UpdateRequest<ProjectEntity>({
				id: '1',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			projectRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await projectUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the project was not found', async () => {
			const request = new UpdateRequest<ProjectEntity>({
				id: '1',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			projectRepositoryMock.getById.mockResolvedValue(null);
			const result = await projectUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'project does not exist',
			});
		});
		test('should return a response failure with a resource error when the category was not found', async () => {
			const request = new UpdateRequest<ProjectEntity>({
				id: '1',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			projectRepositoryMock.getById.mockResolvedValue(request.value);
			categoryRepositoryMock.getById.mockResolvedValue(null);
			const result = await projectUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'category does not exist',
			});
		});
		test('should return a response success with the project updated when post content is created', async () => {
			const request = new UpdateRequest<ProjectEntity>({
				id: '1',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const categoryFound = createCategoryEntity({
				id: '1',
				color: '#FFFFFF',
				name: 'Data Engineering',
			});
			projectRepositoryMock.getById.mockResolvedValue(request.value)
			categoryRepositoryMock.getById.mockResolvedValue(categoryFound);
			projectRepositoryMock.update.mockResolvedValue(request.value);

			const result = await projectUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(request.value);
		});
	});
});
