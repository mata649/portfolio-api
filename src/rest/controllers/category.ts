import { CategoryEntity, createCategoryEntity } from 'portfolio/entities';
import { CategoryRepository } from 'portfolio/repositories';
import { CategoryRequest } from 'portfolio/requests';
import { CategoryUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class CategoryController extends BaseController<
	CategoryEntity,
	CategoryUseCase,
	CategoryRequest
> {
	constructor(categoryRepository: CategoryRepository) {
		const categoryUseCase = new CategoryUseCase(categoryRepository);
		const categoryRequest = new CategoryRequest();
		super(categoryUseCase, createCategoryEntity, categoryRequest);
	}
}
