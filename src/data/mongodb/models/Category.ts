import { Schema, model } from 'mongoose';
import { CategoryEntity } from '../../../domain/entities/category';
const CategorySchema = new Schema<CategoryEntity>({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});
export const CategoryModel = model<CategoryEntity>('Category', CategorySchema);
