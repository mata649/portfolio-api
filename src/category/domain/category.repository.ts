import { CategoryEntity } from '.';
import { BaseRepository } from '@/base/domain/base.repository';
/**
 * Interface representing the methods needed by any category repository
 */
export type CategoryRepository = BaseRepository<CategoryEntity>;
