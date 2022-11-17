import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	githubUrl: {
		type: String,
		required: true,
	},
	idCategory: {
		type: Schema.Types.ObjectId,
		ref: 'Category',

	},
	image: {
		type: String,
		required: true,
	},
});
export const ProjectModel = model('Project', ProjectSchema);
