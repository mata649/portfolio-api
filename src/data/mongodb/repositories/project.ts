import { baseMongoRepository } from './baseMongoRepository';
import { ProjectEntity, createProjectEntity } from 'portfolio/entities';
import { ProjectModel } from 'data/mongodb/models/';
import { ProjectRepository } from 'portfolio/repositories';
import { Filters } from 'portfolio/repositories/baseRepository';

export class ProjectMongoRepository
	extends baseMongoRepository<ProjectEntity>
	implements ProjectRepository
{
	constructor() {
		super(ProjectModel, createProjectEntity);
	}

}
