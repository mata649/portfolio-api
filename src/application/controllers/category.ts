import { CategoryEntity, createCategoryEntity } from 'domain/entities/category';
import { CategoryUseCase } from 'domain/useCases';
import { BaseController } from './baseController';

export class CategoryController extends BaseController<CategoryEntity> {
	constructor(categoryUseCase: CategoryUseCase) {
		super(categoryUseCase, createCategoryEntity);
	}
}
