import { CategoryEntity } from 'portfolio/entities';
import { BaseRepository } from './baseRepository';
/**
 * Interface representing the methods needed by any category repository
 */
export type CategoryRepository = BaseRepository<CategoryEntity>
