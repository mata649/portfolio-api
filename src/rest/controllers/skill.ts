import { createSkillEntity, SkillEntity } from 'portfolio/entities';
import { SkillUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';


export class SkillController extends BaseController<SkillEntity, SkillUseCase> {
	constructor(skillUseCase: SkillUseCase) {
		super(skillUseCase, createSkillEntity);
	}

}