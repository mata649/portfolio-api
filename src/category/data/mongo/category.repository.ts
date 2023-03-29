import { baseMongoRepository } from '@/base/data/mongo/base.repository';
import {
	CategoryEntity,
	createCategoryEntity,
	CategoryRepository,
} from '@/category/domain';
import { CategoryModel } from '@/category/data/mongo/category.model';

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
