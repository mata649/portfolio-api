import { CategoryEntity } from 'domain/entities/category';
import { CategoryRepository } from 'domain/repositories';

import { BaseUseCase } from './baseUseCase';

export class CategoryUseCase extends BaseUseCase<CategoryEntity> {
	constructor(categoryRepository: CategoryRepository) {
		super(categoryRepository, 'category');
	}
}
