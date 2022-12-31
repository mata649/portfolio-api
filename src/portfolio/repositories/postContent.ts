import { PostContentEntity } from 'portfolio/entities';
import { BaseRepository } from './baseRepository';
/**
 * Interface representing the methods needed by any post's content repository
 */
export interface PostContentRepository
	extends BaseRepository<PostContentEntity> {}
