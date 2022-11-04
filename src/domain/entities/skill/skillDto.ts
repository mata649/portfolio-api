import { Skill } from './skillEntity';

export interface CreateSkillDto extends Omit<Skill, 'id'> {}

export interface UpdateSkillDto extends Skill{}

