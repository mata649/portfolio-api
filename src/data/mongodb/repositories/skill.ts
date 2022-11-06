import { baseMongoRepository } from './baseMongoRepository';
import { SkillEntity, createSkillEntity } from 'domain/entities/skill';
import { SkillModel } from 'data/mongodb/models/Skill';

export class SkillMongoRepository extends baseMongoRepository<SkillEntity> {
	constructor() {
		super(SkillModel, createSkillEntity);
	}
}
