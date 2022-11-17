import { Schema, model } from 'mongoose';

const SkillSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	idCategory: {
		type: Schema.Types.ObjectId,
		ref: 'Category',


	},
});

export const SkillModel = model('Skill', SkillSchema);
