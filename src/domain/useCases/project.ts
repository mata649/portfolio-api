import { ProjectEntity } from 'domain/entities';
import { CategoryRepository, ProjectRepository } from 'domain/repositories';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'domain/response';

import { BaseUseCase } from './baseUseCase';

export class ProjectUseCase extends BaseUseCase<
	ProjectEntity,
	ProjectRepository
> {
	constructor(
		projectRepository: ProjectRepository,
		protected readonly categoryRepository: CategoryRepository
	) {
		super(projectRepository, 'repository');
	}

	async create(
		project: ProjectEntity
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const categoryFound = await this.categoryRepository.getById(
				project.idCategory
			);
			if (!categoryFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'category does not exist'
				);
			}
			const projectCreated = await this.baseRepository.create(project);

			return new ResponseSuccess(ResponseTypes.CREATED, projectCreated);
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async update(
		project: ProjectEntity
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const projectFound = await this.baseRepository.getById(project.id);
			if (!projectFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					`${this.itemName} does not exist`
				);
			}
			const categoryFound = await this.categoryRepository.getById(
				project.idCategory
			);
			if (!categoryFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'category does not exist'
				);
			}
			const itemUpdated = await this.baseRepository.update(project);
			return new ResponseSuccess(ResponseTypes.OK, itemUpdated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
