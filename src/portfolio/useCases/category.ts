import { CategoryEntity } from 'portfolio/entities';
import { CategoryRepository } from 'portfolio/repositories';

import { BaseUseCase } from './baseUseCase';

export class CategoryUseCase extends BaseUseCase<
	CategoryEntity,
	CategoryRepository
> {
	constructor(categoryRepository: CategoryRepository) {
		super(categoryRepository, 'category');
	}
}
