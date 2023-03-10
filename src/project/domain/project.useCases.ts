import { ProjectEntity, ProjectRepository } from '.';
import { CategoryRepository } from '@/category/domain/category.repository';
import {
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';

import { BaseUseCase } from '@/base/domain/base.useCases';
/**
 * Provides CRUD functionality for a repository of project.
 */
export class ProjectUseCase extends BaseUseCase<
	ProjectEntity,
	ProjectRepository
> {
	/**
	 * Constructs a new ProjectUseCase.
	 * @param projectRepository An instance of a repository of projects.
	 * @param categoryRepository An instance of a repository of categories.
	 */
	constructor(
		projectRepository: ProjectRepository,
		protected readonly categoryRepository: CategoryRepository
	) {
		super(projectRepository, 'project');
	}
	/**
	 * Creates a new project in the repository.
	 * @param request A CreateRequest object containing the project to create or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the created project if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
	/**
	 * Updates an existing project in the repository.
	 * @param request An UpdateRequest object containing the updated project or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the updated project if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
