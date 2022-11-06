import { Schema, model } from 'mongoose';
import { SkillEntity } from '../../../domain/entities/skill';
const SkillSchema = new Schema<SkillEntity>({
	name: {
		type: String,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});
export const SkillModel = model<SkillEntity>('Skill', SkillSchema);
