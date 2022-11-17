import { CategoryEntity, SkillEntity } from 'portfolio/entities';
import { BaseRepository } from './baseRepository';
export interface SkillByCategory extends Omit<CategoryEntity,'id'> {
	skills: Omit<SkillEntity, 'idCategory'|'id'>[];
}

export interface SkillRepository extends BaseRepository<SkillEntity> {
	getSkillsByCategory(): Promise<SkillByCategory[] | null>;
}
