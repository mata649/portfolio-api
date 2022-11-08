import { createSkillEntity, SkillEntity } from 'domain/entities';
import { SkillUseCase } from 'domain/useCases';
import { BaseController } from './baseController';


export class SkillController extends BaseController<SkillEntity, SkillUseCase> {
	constructor(skillUseCase: SkillUseCase) {
		super(skillUseCase, createSkillEntity);
	}
}