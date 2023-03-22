import {
	CreateRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';
import { createSkillEntity, SkillRequest } from '@/skill/domain';

describe('SkillRequest', () => {
	let skillRequest: SkillRequest;
	beforeEach(() => {
		skillRequest = new SkillRequest();
	});
	describe('create', () => {
		test('should return a CreateRequest when skill is valid', () => {
			const item = createSkillEntity({
				id: '',
				idCategory: '1',
				name: 'Python',
			});
			const result = skillRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when name and idCategory are an empty string', () => {
			const item = createSkillEntity({
				id: '',
				idCategory: '',
				name: '',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'name empty',
					parameter: 'name',
				},

				{
					error: 'idCategory empty',
					parameter: 'idCategory',
				},
			];
			const result = skillRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				console.log(result.errors);
				expect(result.errors.sort()).toEqual(expectedValue.sort());
			}
		});
	});
	describe('update', () => {
		test('should return a UpdateRequest when skill is valid', () => {
			const item = createSkillEntity({
				id: '1',
				idCategory: '1',
				name: 'Python',
			});
			const result = skillRequest.update(item);
			expect(result).toBeInstanceOf(UpdateRequest);
			if (result instanceof UpdateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when id, name and idCategory are an empty string', () => {
			const item = createSkillEntity({
				id: '',
				idCategory: '',
				name: '',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'id empty',
					parameter: 'id',
				},
				{
					error: 'name empty',
					parameter: 'name',
				},
				{
					error: 'idCategory empty',
					parameter: 'idCategory',
				},
			];
			const result = skillRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				console.log(result.errors);
				expect(result.errors.sort()).toEqual(expectedValue.sort());
			}
		});
	});
});
