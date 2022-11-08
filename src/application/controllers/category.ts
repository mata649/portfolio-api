import { CategoryEntity, createCategoryEntity } from 'portfolio/entities';
import { CategoryUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class CategoryController extends BaseController<CategoryEntity, CategoryUseCase> {
	constructor(categoryUseCase: CategoryUseCase) {
		super(categoryUseCase, createCategoryEntity);
	}
}
