import { Schema, model } from 'mongoose';
import { SkillEntity } from 'portfolio/entities';
const SkillSchema = new Schema<SkillEntity>({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	idCategory: {
		type: String,
		ref: 'Category',
		required: true,
	},
});
export const SkillModel = model<SkillEntity>('Skill', SkillSchema);
