import { SkillEntity } from 'portfolio/entities';
import { CategoryRepository, SkillRepository } from 'portfolio/repositories';
import { CreateRequest, InvalidRequest } from 'portfolio/requests';
import {
	ResponseSuccess,
	ResponseFailure,
	ResponseTypes,
} from 'portfolio/response';

import { BaseUseCase } from './baseUseCase';
/**
 * Provides CRUD functionality for a repository of skills.
 */
export class SkillUseCase extends BaseUseCase<SkillEntity, SkillRepository> {
	/**
	 * Constructs a new SkillUseCase.
	 * @param skillRepository An instance of a repository of skills.
	 * @param categoryRepository An instance of a repository of categories.
	 */
	constructor(
		skillRepository: SkillRepository,
		private categoryRepository: CategoryRepository
	) {
		super(skillRepository, 'skill');
	}
	/**
	 * Creates a new skill in the repository.
	 * @param request A CreateRequest object containing the skill to create or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the created skill if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
	async create(
		request: CreateRequest<SkillEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		try {
			const skill = request.value;
			const categoryFound = await this.categoryRepository.getById(
				skill.idCategory
			);
			if (!categoryFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'category does not exist'
				);
			}
			const skillCreated = await this.baseRepository.create(skill);

			return new ResponseSuccess(ResponseTypes.CREATED, skillCreated);
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	/**
	 * Retrieves a list of skills sorted by category.
	 * @returns A ResponseSuccess object with the list of skills if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
	async getSkillsByCategory(): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skillsByCategory =
				await this.baseRepository.getSkillsByCategory();

			return new ResponseSuccess(ResponseTypes.OK, skillsByCategory);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
