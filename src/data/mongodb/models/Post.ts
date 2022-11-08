import { Schema, model } from 'mongoose';
import { PostEntity } from 'portfolio/entities';
const PostSchema = new Schema<PostEntity>({
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
export const PostModel = model<PostEntity>('Post', PostSchema);
