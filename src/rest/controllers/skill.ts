import { Response, Request } from 'express';
import { createSkillEntity, SkillEntity } from 'portfolio/entities';
import { CategoryRepository, SkillRepository } from 'portfolio/repositories';
import { SkillRequest } from 'portfolio/requests';
import { SkillUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

/**
 * Class that handle CRUD operations for the skill entities,
 * It extends the BaseController class and inject the needed dependencies
 */
export class SkillController extends BaseController<
	SkillEntity,
	SkillUseCase,
	SkillRequest
> {
	/**
	 * In the constructor, it creates a new SkillUseCase instance,
	 * a new SkillRequest instance, and call the super constructor to pass those dependencies
	 *
	 * @param skillRepository - Repository for the skill entities
	 * @param categoryRepository - Repository for the category entities
	 */
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
	/**
	 * This method handles the retrieval of all skills by category from the repository,
	 * The response from the use case is then returned to the client with the appropriate status code.
	 *
	 * @param _ - not used parameter
	 * @param res - express response object

	 */
	getSkillsByCategory = async (_: Request, res: Response) => {
		const response = await this.baseUseCase.getSkillsByCategory();
		res.status(response.type).json(response.value);
	};
}
