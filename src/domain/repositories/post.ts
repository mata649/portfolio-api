import { PostEntity } from 'domain/entities';
import { BaseRepository } from './baseRepository';
export interface PostRepository extends BaseRepository<PostEntity> {
	update(post: Omit<PostEntity, 'publishedDate'>): Promise<PostEntity>;
	getBySlug(slug: PostEntity['slug']): Promise<PostEntity | null>;
}
