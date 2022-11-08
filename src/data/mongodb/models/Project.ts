import { Schema, model } from 'mongoose';
import { ProjectEntity } from 'portfolio/entities';
const ProjectSchema = new Schema<ProjectEntity>({
	name: {
		type: String,
		required: true,
	},
	githubUrl: {
		type: String,
		required: true,
	},
	idCategory: {
		type: String,
		ref: 'Category',
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});
export const ProjectModel = model<ProjectEntity>('Project', ProjectSchema);
