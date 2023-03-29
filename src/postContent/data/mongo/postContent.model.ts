import { Schema, model } from 'mongoose';
import { Languages } from '@/postContent/domain';
const PostContentSchema = new Schema({
	idPost:{
		type: Schema.Types.ObjectId,
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
export const PostContentModel = model('PostContent', PostContentSchema);
