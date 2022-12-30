import { ProjectEntity } from 'portfolio/entities';
import { CategoryRepository, ProjectRepository } from 'portfolio/repositories';
import {
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from 'portfolio/requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'portfolio/response';

import { BaseUseCase } from './baseUseCase';

export class ProjectUseCase extends BaseUseCase<
	ProjectEntity,
	ProjectRepository
> {
	constructor(
		projectRepository: ProjectRepository,
		protected readonly categoryRepository: CategoryRepository
	) {
		super(projectRepository, 'project');
	}

	async create(
		request: CreateRequest<ProjectEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const project = request.value;
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
		request: UpdateRequest<ProjectEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const project = request.value;
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
