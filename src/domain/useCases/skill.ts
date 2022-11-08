import { SkillEntity } from 'domain/entities';
import { SkillRepository } from 'domain/repositories';

import { BaseUseCase } from './baseUseCase';

export class SkillUseCase extends BaseUseCase<SkillEntity, SkillRepository> {
	constructor(skillRepository: SkillRepository) {
		super(skillRepository,  'skill');
	}
}
