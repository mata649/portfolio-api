import { baseMongoRepository } from './baseMongoRepository';
import { SkillEntity, createSkillEntity } from 'portfolio/entities';
import { SkillModel } from 'data/mongodb/models/';
import { SkillRepository } from 'portfolio/repositories';

export class SkillMongoRepository
	extends baseMongoRepository<SkillEntity>
	implements SkillRepository
{
	constructor() {
		super(SkillModel, createSkillEntity);
	}
}
