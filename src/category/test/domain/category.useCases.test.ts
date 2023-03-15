import { CategoryUseCase, CategoryRepository } from '@/category/domain';

const categoryRepository: CategoryRepository = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	update: jest.fn(),
	getById: jest.fn(),
};

describe('CategoryUseCase', () => {
	test('Should create a new instance of CategoryUseCase', () => {
		const categoryUseCase = new CategoryUseCase(categoryRepository);
		expect(categoryUseCase.baseRepository).toEqual(categoryRepository);
		expect(categoryUseCase.itemName).toEqual('category');
	});
});
