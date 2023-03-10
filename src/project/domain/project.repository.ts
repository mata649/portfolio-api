import { ProjectEntity } from '.';
import { BaseRepository } from '@/base/domain/base.repository';

/**
 * Interface representing the methods needed by any project repository
 */
export type ProjectRepository = BaseRepository<ProjectEntity>;
