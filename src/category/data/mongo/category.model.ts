import { Schema, model } from 'mongoose';
const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});
export const CategoryModel = model('Category', CategorySchema);
