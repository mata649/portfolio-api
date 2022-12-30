import { Response, Request } from 'express';
import { createSkillEntity, SkillEntity } from 'portfolio/entities';
import { CategoryRepository, SkillRepository } from 'portfolio/repositories';
import { SkillRequest } from 'portfolio/requests';
import { SkillUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class SkillController extends BaseController<SkillEntity, SkillUseCase, SkillRequest> {
	constructor(
		skillRepository: SkillRepository,
		categoryRepository: CategoryRepository
	) {
		const skillUseCase = new SkillUseCase(
			skillRepository,
			categoryRepository
		);
		const skillRequest = new SkillRequest();
		super(skillUseCase, createSkillEntity, skillRequest);
	}
	getSkillsByCategory = async (_: Request, res: Response) => {
		const response = await this.baseUseCase.getSkillsByCategory();
		res.status(response.type).json(response.value);
	};
}
