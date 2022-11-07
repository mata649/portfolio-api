import { baseMongoRepository } from './baseMongoRepository';
import { SkillEntity, createSkillEntity } from 'domain/entities';
import { SkillModel } from 'data/mongodb/models/';
import { SkillRepository } from 'domain/repositories';

export class SkillMongoRepository
	extends baseMongoRepository<SkillEntity>
	implements SkillRepository
{
	constructor() {
		super(SkillModel, createSkillEntity);
	}
}
