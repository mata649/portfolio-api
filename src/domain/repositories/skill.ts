import { SkillEntity } from 'domain/entities/skill';

export interface SkillRepository {
	create(skill: SkillEntity): Promise<SkillEntity>;
	get(): Promise<SkillEntity[] | null>;
	getById(id: SkillEntity['id']): Promise<SkillEntity | null>;
	delete(id: SkillEntity['id']): Promise<SkillEntity>;
	update(skill: SkillEntity): Promise<SkillEntity>;
}
