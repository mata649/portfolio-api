import { CategoryEntity } from 'domain/entities';
import { CategoryRepository } from 'domain/repositories';

import { BaseUseCase } from './baseUseCase';

export class CategoryUseCase extends BaseUseCase<
	CategoryEntity,
	CategoryRepository
> {
	constructor(categoryRepository: CategoryRepository) {
		super(categoryRepository, 'category');
	}
}
