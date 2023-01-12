import { CategoryEntity, createCategoryEntity } from 'portfolio/entities';
import { CategoryRepository } from 'portfolio/repositories';
import { CategoryRequest } from 'portfolio/requests';
import { CategoryUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

/**
 * Class that handle CRUD operations for the category entities,
 * It extends the BaseController class and inject the needed dependencies
 */
export class CategoryController extends BaseController<
	CategoryEntity,
	CategoryUseCase,
	CategoryRequest
> {
	/**
	 *Creates a new CategoryRequest instance, and call the super constructor to pass those dependencies
	 *
	 * @param categoryRepository - Repository for the category entities
	 */
	constructor(categoryRepository: CategoryRepository) {
		const categoryUseCase = new CategoryUseCase(categoryRepository);
		const categoryRequest = new CategoryRequest();
		super(categoryUseCase, createCategoryEntity, categoryRequest);
	}
}
