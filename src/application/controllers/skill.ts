import { createSkillEntity, SkillEntity } from 'domain/entities/skill';
import { SkillUseCase } from 'domain/useCases';
import { BaseController } from './baseController';


export class SkillController extends BaseController<SkillEntity> {
	constructor(skillUseCase: SkillUseCase) {
		super(skillUseCase, createSkillEntity);
	}
}