import { Response, Request } from 'express';
import { createSkillEntity, SkillEntity } from 'portfolio/entities';
import { SkillUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';


export class SkillController extends BaseController<SkillEntity, SkillUseCase> {
	constructor(skillUseCase: SkillUseCase) {
		super(skillUseCase, createSkillEntity);
	}
	getSkillsByCategory = async (_: Request, res: Response) => {
		const response = await this.baseUseCase.getSkillsByCategory();
		res.status(response.type).json(response.value);
	};
}
