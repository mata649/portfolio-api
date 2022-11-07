import { CategoryEntity } from 'domain/entities/category';
import { BaseRepository } from './baseRepository';
export interface SkillRepository extends BaseRepository<CategoryEntity> {}
