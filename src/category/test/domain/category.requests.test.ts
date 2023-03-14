import {
	CreateRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';
import { CategoryRequest, createCategoryEntity } from '@/category/domain';

describe('CategoryRequest', () => {
	let categoryRequest: CategoryRequest;
	beforeEach(() => {
		categoryRequest = new CategoryRequest();
	});
	describe('isValidRGB', () => {
		test('should return true when color is valid hex rgb', () => {
			const result = categoryRequest.isValidRGB('#FF0000');
			expect(result).toEqual(true);
		});
		test('should return false when color is invalid hex rgb', () => {
			const result = categoryRequest.isValidRGB('#FFFPÑ');
			expect(result).toEqual(false);
		});
	});

	describe('isValidARGB', () => {
		test('should return true when color is valid hex argb', () => {
			const result = categoryRequest.isValidARGB('#80FF0000');
			expect(result).toEqual(true);
		});
		test('should return false when color is invalid hex argb', () => {
			const result = categoryRequest.isValidARGB('#FFFPÑ');
			expect(result).toEqual(false);
		});
	});
	describe('create', () => {
		test('should return a CreateRequest when category is valid', () => {
			const item = createCategoryEntity({
				color: '#FF0000',
				name: 'Backend',
			});
			const result = categoryRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when name is an empty string', () => {
			const item = createCategoryEntity({
				color: '#FF0000',
				name: '',
			});
			const result = categoryRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('name empty');
				expect(result.errors[0].parameter).toEqual('name');
			}
		});
		test('should return an InvalidRequest when color is an empty string', () => {
			const item = createCategoryEntity({
				color: '',
				name: 'Frontend',
			});
			const result = categoryRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('color empty');
				expect(result.errors[0].parameter).toEqual('color');
			}
		});
		test('should return an InvalidRequest when color is an invalid rgb or argb color', () => {
			const item = createCategoryEntity({
				color: '#FF00',
				name: 'AWS',
			});
			const result = categoryRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual(
					'color format is incorrect'
				);
				expect(result.errors[0].parameter).toEqual('color');
			}
		});
	});
	describe('update', () => {
		test('should return a UpdateRequest when category is valid', () => {
			const item = createCategoryEntity({
				id: '1',
				color: '#FF0000',
				name: 'Backend',
			});
			const result = categoryRequest.update(item);
			expect(result).toBeInstanceOf(UpdateRequest);
			if (result instanceof UpdateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when name and id are empty strings', () => {
			const item = createCategoryEntity({
				color: '#FF0000',
			});
			const expectedObject: RequestError[] = [
				{ error: 'id empty', parameter: 'id' },
				{ error: 'name empty', parameter: 'name' },
			];
			const result = categoryRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedObject);
			}
		});
		test('should return an InvalidRequest when color is an empty string', () => {
			const item = createCategoryEntity({
				id: '1',
				color: '',
				name: 'Frontend',
			});
			const result = categoryRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('color empty');
				expect(result.errors[0].parameter).toEqual('color');
			}
		});
		test('should return an InvalidRequest when color is an invalid rgb or argb color', () => {
			const item = createCategoryEntity({
				id: '1',
				color: '#FF00',
				name: 'AWS',
			});
			const result = categoryRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual(
					'color format is incorrect'
				);
				expect(result.errors[0].parameter).toEqual('color');
			}
		});
	});
});
