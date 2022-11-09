import { Schema, model } from 'mongoose';
import { PostContentEntity } from 'portfolio/entities';
import { Languages } from 'portfolio/entities/language';
const PostContentSchema = new Schema<PostContentEntity>({
	idPost:{
		type: String,
		ref: 'Post',
		required: true,
	},
	content:{
		type: String,
		required:true
	},
	language:{
		type: String,
		enum: Languages,
		required: true
	},
	title:{
		type: String,
		required:true
	}

});
export const PostContentModel = model<PostContentEntity>('PostContent', PostContentSchema);
