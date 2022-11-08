import { SkillEntity } from 'portfolio/entities';
import { SkillRepository } from 'portfolio/repositories';

import { BaseUseCase } from './baseUseCase';

export class SkillUseCase extends BaseUseCase<SkillEntity, SkillRepository> {
	constructor(skillRepository: SkillRepository) {
		super(skillRepository,  'skill');
	}
}
