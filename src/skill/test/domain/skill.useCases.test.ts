import { CreateRequest, InvalidRequest } from '@/base/domain/base.requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';
import { createCategoryEntity } from '@/category/domain';
import { SkillByCategory, SkillEntity, SkillUseCase } from '@/skill/domain';

const skillRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	getSkillsByCategory: jest.fn(),
	update: jest.fn(),
};

const categoryRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	update: jest.fn(),
};

describe('SkillUseCase', () => {
	let skillUseCase: SkillUseCase;
	beforeEach(() => {
		skillUseCase = new SkillUseCase(
			skillRepositoryMock,
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

			const result = await skillUseCase.create(invalidRequest);
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
			const request = new CreateRequest<SkillEntity>({
				id: '',
				idCategory: '1',
				name: 'Python',
			});
			categoryRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await skillUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the category was not found', async () => {
			const request = new CreateRequest<SkillEntity>({
				id: '',
				idCategory: '1',
				name: 'Python',
			});
			categoryRepositoryMock.getById.mockResolvedValue(null);
			const result = await skillUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'category does not exist',
			});
		});
		test('should return a response success with the skill created when post content is created', async () => {
			const request = new CreateRequest<SkillEntity>({
				id: '',
				idCategory: '1',
				name: 'Python',
			});
			const categoryFound = createCategoryEntity({
				id: '1',
				color: '#FFFFFF',
				name: 'Data Engineering',
			});

			categoryRepositoryMock.getById.mockResolvedValue(categoryFound);
			skillRepositoryMock.create.mockResolvedValue({
				...request.value,
				id: '1',
			});

			const result = await skillUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual({ ...request.value, id: '1' });
		});
	});
	describe('getSkillsByCategory', () => {
		test('should return a response faiure with a system error when an error happens', async () => {
			skillRepositoryMock.getSkillsByCategory.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await skillUseCase.getSkillsByCategory();
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response success when all is correct', async () => {
			const expectedValue: SkillByCategory[] = [
				{
					color: '#FFFFF',
					name: 'Backend',
					skills: [
						{ name: 'Python' },
						{ name: 'Typescript' },
						{ name: 'ExpressJs' },
					],
				},
				{
					color: '#AAAAA',
					name: 'Frontend',
					skills: [
						{ name: 'HTML' },
						{ name: 'CSS' },
						{ name: 'ReactJs' },
					],
				},
			];
			skillRepositoryMock.getSkillsByCategory.mockResolvedValue(
				expectedValue
			);
			const result = await skillUseCase.getSkillsByCategory();
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedValue);
		});
	});
});
