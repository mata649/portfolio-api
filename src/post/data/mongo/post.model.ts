import { Schema, model } from 'mongoose';
const PostSchema = new Schema({
	defaultTitle: {
		type: String,
		required: true,
	},
	publishedDate: {
		type: Date,
		required: true,
	},
	slug: {
		type: String,
		required: true,
	},
});
export const PostModel = model('Post', PostSchema);
