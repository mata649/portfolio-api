import { CategoryEntity } from 'portfolio/entities';
import { CategoryRepository } from 'portfolio/repositories';

import { BaseUseCase } from './baseUseCase';
/**
 * Provides CRUD functionality for a repository of categories.
 * @extends BaseUseCase<CategoryEntity, CategoryRepository>
 */
export class CategoryUseCase extends BaseUseCase<
	CategoryEntity,
	CategoryRepository
> {
	constructor(categoryRepository: CategoryRepository) {
		super(categoryRepository, 'category');
	}
}
