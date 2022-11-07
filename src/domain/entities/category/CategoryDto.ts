import { CategoryEntity } from './categoryEntity';

export interface CreateCategoryDto extends Omit<CategoryEntity, 'id'> {}

export interface UpdateCategoryDto extends CategoryEntity {}
