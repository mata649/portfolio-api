import { PostContentEntity } from '.';
import { BaseRepository } from '@/base/domain/base.repository';
/**
 * Interface representing the methods needed by any post's content repository
 */
export type PostContentRepository = BaseRepository<PostContentEntity>
