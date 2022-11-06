import { SkillEntity } from './skillEntity';

export interface CreateSkillDto extends Omit<SkillEntity, 'id'> {}

export interface UpdateSkillDto extends SkillEntity{}

