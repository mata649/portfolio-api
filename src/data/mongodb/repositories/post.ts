import { baseMongoRepository } from './baseMongoRepository';
import { PostEntity, createPostEntity } from 'domain/entities';
import { PostModel } from 'data/mongodb/models/';
import { PostRepository } from 'domain/repositories';

export class PostMongoRepository
	extends baseMongoRepository<PostEntity>
	implements PostRepository
{
	constructor() {
		super(PostModel, createPostEntity);
	}
	async update(post: Omit<PostEntity, 'publishedDate'>): Promise<PostEntity> {
		const postUpdated = await this.model.findByIdAndUpdate(post.id, post, {
			new: true,
		});
		return this.createItemEntity(postUpdated);
	}
	async getBySlug(slug: PostEntity['slug']): Promise<PostEntity | null> {
		const userFound = await this.model.findOne({ slug });
		return userFound && this.createItemEntity(userFound);
	}
}
