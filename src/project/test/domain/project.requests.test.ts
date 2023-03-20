import {
	CreateRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';
import { createProjectEntity, ProjectRequest } from '@/project/domain';

describe('ProjectRequest', () => {
	let projectRequest: ProjectRequest;

	beforeEach(() => {
		projectRequest = new ProjectRequest();
	});
	describe('create', () => {
		test('should return a CreateRequest when project is valid', () => {
			const item = createProjectEntity({
				id: '',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const result = projectRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when name, description, githubUrl or idCategory are empty strings', () => {
			const item = createProjectEntity({
				id: '',
				description: '',
				githubUrl: '',
				idCategory: '',
				name: '',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'name empty',
					parameter: 'name',
				},
				{
					error: 'description empty',
					parameter: 'description',
				},

				{
					error: 'idCategory empty',
					parameter: 'idCategory',
				},
				{
					error: 'githubUrl empty',
					parameter: 'githubUrl',
				},
			];
			const result = projectRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				console.log(result.errors);
				expect(result.errors.sort()).toEqual(expectedValue.sort());
			}
		});
		test('should return InvalidRequest when githubUrl is not accepted', () => {
			const item = createProjectEntity({
				id: '',
				description: 'project description',
				githubUrl: 'www.github.c/hola',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'the url provided is not a valid github url',
					parameter: 'githubUrl',
				},
			];
			const result = projectRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
	});
	describe('update', () => {
		test('should return UpdateRequest when post content is valid', () => {
			const item = createProjectEntity({
				id: '1',
				description: 'project description',
				githubUrl:
					'https://github.com/mata649/costa_rica_supermarkets_scrapper',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const result = projectRequest.update(item);
			expect(result).toBeInstanceOf(UpdateRequest);
			if (result instanceof UpdateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when id, name, description, githubUrl or idCategory are empty strings', () => {
			const item = createProjectEntity({
				id: '',
				description: '',
				githubUrl: '',
				idCategory: '',
				name: '',
			});
			const expectedValue: RequestError[] = [
				{
					error:"id empty",
					parameter:"id"
				},
				{
					error: 'name empty',
					parameter: 'name',
				},
				{
					error: 'description empty',
					parameter: 'description',
				},

				{
					error: 'idCategory empty',
					parameter: 'idCategory',
				},
				{
					error: 'githubUrl empty',
					parameter: 'githubUrl',
				},
			];
			const result = projectRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
		test('should return InvalidRequest when githubUrl is not accepted', () => {
			const item = createProjectEntity({
				id: '1',
				description: 'project description',
				githubUrl: 'www.github.co/hola',
				idCategory: '1',
				name: 'portfolio-api',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'the url provided is not a valid github url',
					parameter: 'githubUrl',
				},
			];
			const result = projectRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
	});
});
