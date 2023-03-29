import { baseMongoRepository } from '@/base/data/mongo/base.repository';
import {
	PostContentEntity,
	createPostContentEntity,
	PostContentRepository,
} from '@/postContent/domain';
import { PostContentModel } from './postContent.model';
/**
 *Repository for interacting with PostContent entities in MongoDB
 */
export class PostContentMongoRepository
	extends baseMongoRepository<PostContentEntity>
	implements PostContentRepository
{
	/*
	 *Creates a new PostContentMongoRepository instance
	 */
	constructor() {
		super(PostContentModel, createPostContentEntity);
	}
}
