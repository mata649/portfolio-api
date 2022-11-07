import { baseMongoRepository } from './baseMongoRepository';
import { ProjectEntity, createProjectEntity } from 'domain/entities';
import { ProjectModel } from 'data/mongodb/models/';
import { ProjectRepository } from 'domain/repositories';

export class ProjectMongoRepository
	extends baseMongoRepository<ProjectEntity>
	implements ProjectRepository
{
	constructor() {
		super(ProjectModel, createProjectEntity);
	}
}
