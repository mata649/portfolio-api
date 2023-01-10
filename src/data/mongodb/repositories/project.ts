import { baseMongoRepository } from './baseMongoRepository';
import { ProjectEntity, createProjectEntity } from 'portfolio/entities';
import { ProjectModel } from 'data/mongodb/models/';
import { ProjectRepository } from 'portfolio/repositories';
/**
 *Repository for interacting with Project entities in MongoDB
 *@extends baseMongoRepository - for basic CRUD functionality
 *@implements ProjectRepository - for Project specific repository functions
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
