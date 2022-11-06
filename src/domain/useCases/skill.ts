import {
	CreateSkillDto,
	createSkillEntity,
	UpdateSkillDto,
} from 'domain/entities/skill';
import { SkillRepository } from 'domain/repositories';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'domain/response';

export class SkillUseCase {
	constructor(private readonly skillRepository: SkillRepository) {}

	async create(
		skillDto: CreateSkillDto
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skill = createSkillEntity({ ...skillDto });
			const skillCreate = await this.skillRepository.create(skill);

			return new ResponseSuccess(ResponseTypes.CREATED, skillCreate);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async get(): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skills = this.skillRepository.get();
			return new ResponseSuccess(ResponseTypes.OK, skills);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async update(
		skillDto: UpdateSkillDto
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skill = createSkillEntity({ ...skillDto });

			const skillFound = await this.skillRepository.getById(skill.id);
			if (!skillFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'skill does not exist'
				);
			}
			const skillUpdated = this.skillRepository.update(skill);
			return new ResponseSuccess(ResponseTypes.OK, skillUpdated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async delete(id: string): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skillFound = await this.skillRepository.getById(id);
			if (!skillFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'skill does not exist'
				);
			}
			const skillDeleted = this.skillRepository.delete(id);
			return new ResponseSuccess(ResponseTypes.OK, skillDeleted);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system errors'
			);
		}
	}
}
