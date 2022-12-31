import { PostEntity } from 'portfolio/entities';
import { BaseRepository } from './baseRepository';
/**
 * Interface representing the methods needed by any category repository
 */
export interface PostRepository extends BaseRepository<PostEntity> {
	/**
	 * Updates a post in the repository avoiding passing the publishedDate
	 * @param post - Post to be updated in the repository
	 * @returns If an post was updated, returns a post, else returns a null
	 */
	update(post: Omit<PostEntity, 'publishedDate'>): Promise<PostEntity>;
	/**
	 * Gets a post by slug from the repository
	 * @param slug - Identifier of the post to get
	 * @returns If an post was found, returns a post, else returns a null
	 */
	getBySlug(slug: PostEntity['slug']): Promise<PostEntity | null>;
}
