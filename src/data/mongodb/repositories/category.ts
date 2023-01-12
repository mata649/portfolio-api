import { baseMongoRepository } from './baseMongoRepository';
import { CategoryEntity, createCategoryEntity } from 'portfolio/entities';
import { CategoryModel } from 'data/mongodb/models/';
import { CategoryRepository } from 'portfolio/repositories';
/**
 *Repository for interacting with Category entities in MongoDB
 */
export class CategoryMongoRepository
	extends baseMongoRepository<CategoryEntity>
	implements CategoryRepository
{
	/*
	 *Creates a new CategoryMongoRepository instance
	 */
	constructor() {
		super(CategoryModel, createCategoryEntity);
	}
}
