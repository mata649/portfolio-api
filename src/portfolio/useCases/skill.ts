import { SkillEntity } from 'portfolio/entities';
import { CategoryRepository, SkillRepository } from 'portfolio/repositories';
import { CreateRequest, InvalidRequest } from 'portfolio/requests';
import {
	ResponseSuccess,
	ResponseFailure,
	ResponseTypes,
} from 'portfolio/response';

import { BaseUseCase } from './baseUseCase';

export class SkillUseCase extends BaseUseCase<SkillEntity, SkillRepository> {
	constructor(
		skillRepository: SkillRepository,
		private categoryRepository: CategoryRepository
	) {
		super(skillRepository, 'skill');
	}
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
