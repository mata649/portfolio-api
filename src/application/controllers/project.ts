import { createProjectEntity, ProjectEntity } from 'portfolio/entities';
import { ProjectUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class ProjectController extends BaseController<ProjectEntity, ProjectUseCase> {
	constructor(projectUseCase: ProjectUseCase) {
		super(projectUseCase, createProjectEntity);
	}

}
