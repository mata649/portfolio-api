import { baseMongoRepository } from './baseMongoRepository';
import { ProjectEntity, createProjectEntity } from 'portfolio/entities';
import { ProjectModel } from 'data/mongodb/models/';
import { ProjectRepository } from 'portfolio/repositories';
/**
 *Repository for interacting with Project entities in MongoDB
 */
export class ProjectMongoRepository
	extends baseMongoRepository<ProjectEntity>
	implements ProjectRepository
{
	/*
	 *Creates a new ProjectMongoRepository instance
	 */
	constructor() {
		super(ProjectModel, createProjectEntity);
	}
}
