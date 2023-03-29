import { baseMongoRepository } from '@/base/data/mongo/base.repository';
import { PostEntity, createPostEntity, PostRepository } from '@/post/domain';
import { PostModel } from './post.model';

/**
 *Repository for interacting with Post entities in MongoDB
 */
export class PostMongoRepository
	extends baseMongoRepository<PostEntity>
	implements PostRepository
{
	/*
	 *Creates a new PostMongoRepository instance
	 */
	constructor() {
		super(PostModel, createPostEntity);
	}
	/**
	 *Update a post in the database
	 *@param post - the post to update, with all properties except for the published date
	 *@returns the updated post
	 */
	async update(post: Omit<PostEntity, 'publishedDate'>): Promise<PostEntity> {
		const postUpdated = await this.model.findByIdAndUpdate(post.id, post, {
			new: true,
		});
		return this.createItemEntity(postUpdated);
	}
	/**
	 *Retrieve a post from the database by its slug
	 *@param slug - the unique slug for the post
	 *@returns the post with the matching slug, or null if no such post exists
	 */
	async getBySlug(slug: PostEntity['slug']): Promise<PostEntity | null> {
		const userFound = await this.model.findOne({ slug });
		return userFound && this.createItemEntity(userFound);
	}
}
