import { baseMongoRepository } from '@/base/data/mongo/base.repository';
import {
	createProjectEntity,
	ProjectEntity,
	ProjectRepository,
} from '@/project/domain';
import { ProjectModel } from './project.model';

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
