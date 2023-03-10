import { CategoryEntity, CategoryRepository } from '.';

import { BaseUseCase } from '@/base/domain/base.useCases';
/**
 * Provides CRUD functionality for a repository of categories.
 */
export class CategoryUseCase extends BaseUseCase<
	CategoryEntity,
	CategoryRepository
> {
	constructor(categoryRepository: CategoryRepository) {
		super(categoryRepository, 'category');
	}
}
