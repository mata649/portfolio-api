import { baseMongoRepository } from './baseMongoRepository';
import { PostContentEntity, createPostContentEntity } from 'portfolio/entities';
import { PostContentModel } from 'data/mongodb/models/';
import { PostContentRepository } from 'portfolio/repositories';

export class PostContentMongoRepository
	extends baseMongoRepository<PostContentEntity>
	implements PostContentRepository
{
	constructor() {
		super(PostContentModel, createPostContentEntity);
	}
}
