import { createProjectEntity, ProjectEntity } from 'domain/entities';
import { ProjectUseCase } from 'domain/useCases';
import { BaseController } from './baseController';

export class ProjectController extends BaseController<ProjectEntity> {
	constructor(projectUseCase: ProjectUseCase) {
		super(projectUseCase, createProjectEntity);
	}
}
