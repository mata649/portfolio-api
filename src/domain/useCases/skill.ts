import { createSkillEntity, SkillEntity } from 'domain/entities/skill';
import { SkillRepository } from 'domain/repositories';

import { BaseUseCase } from './baseUseCase';

export class SkillUseCase extends BaseUseCase<SkillEntity> {
	constructor(skillRepository: SkillRepository) {
		super(skillRepository, createSkillEntity, 'skill');
	}
}
