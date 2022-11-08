import { Schema, model } from 'mongoose';
import { CategoryEntity } from 'portfolio/entities';
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
