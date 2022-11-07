import { baseMongoRepository } from './baseMongoRepository';
import { CategoryEntity, createCategoryEntity } from 'domain/entities';
import { CategoryModel } from 'data/mongodb/models/';
import { CategoryRepository } from 'domain/repositories';

export class CategoryMongoRepository
	extends baseMongoRepository<CategoryEntity>
	implements CategoryRepository
{
	constructor() {
		super(CategoryModel, createCategoryEntity);
	}
}
