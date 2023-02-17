import {  ProjectEntity } from 'portfolio/entities';
import { BaseRepository } from './baseRepository';

/**
 * Interface representing the methods needed by any project repository
 */
export type ProjectRepository = BaseRepository<ProjectEntity>
