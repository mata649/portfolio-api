import { baseMongoRepository } from './baseMongoRepository';
import { CategoryEntity, createCategoryEntity } from 'portfolio/entities';
import { CategoryModel } from 'data/mongodb/models/';
import { CategoryRepository } from 'portfolio/repositories';

export class CategoryMongoRepository
	extends baseMongoRepository<CategoryEntity>
	implements CategoryRepository
{
	constructor() {
		super(CategoryModel, createCategoryEntity);
	}
}
