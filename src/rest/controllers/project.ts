import { createProjectEntity, ProjectEntity } from 'portfolio/entities';
import { CategoryRepository, ProjectRepository } from 'portfolio/repositories';
import { ProjectRequest } from 'portfolio/requests';
import { ProjectUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class ProjectController extends BaseController<
	ProjectEntity,
	ProjectUseCase,
	ProjectRequest
> {
	constructor(
		projectRepository: ProjectRepository,
		categoryRepository: CategoryRepository
	) {
		const projectUseCase = new ProjectUseCase(
			projectRepository,
			categoryRepository
		);
		const projectRequest = new ProjectRequest();
		super(projectUseCase, createProjectEntity, projectRequest);
	}
}
