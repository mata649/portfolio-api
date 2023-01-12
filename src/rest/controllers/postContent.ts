import { createPostContentEntity, PostContentEntity } from 'portfolio/entities';
import { PostContentRepository, PostRepository } from 'portfolio/repositories';
import { PostContentRequest } from 'portfolio/requests';
import { PostContentUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

/**
 * Class that handle CRUD operations for the post content entities,
 * It extends the BaseController class and inject the needed dependencies
 */
export class PostContentController extends BaseController<
	PostContentEntity,
	PostContentUseCase,
	PostContentRequest
> {
	/**
	 * Creates a new PostContentUseCase instance,
	 * a new PostContentRequest instance, and call the super constructor to pass those dependencies
	 *
	 * @param postRepository - Repository for the post entities
	 * @param postContentRepository - Repository for the post content entities
	 */
	constructor(
		postRepository: PostRepository,
		postContentRepository: PostContentRepository
	) {
		const postContentUseCase = new PostContentUseCase(
			postContentRepository,
			postRepository
		);
		const postContentRequest = new PostContentRequest();
		super(postContentUseCase, createPostContentEntity, postContentRequest);
	}
}
