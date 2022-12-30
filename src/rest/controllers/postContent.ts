import { createPostContentEntity, PostContentEntity } from 'portfolio/entities';
import { PostContentRepository, PostRepository } from 'portfolio/repositories';
import { PostContentRequest } from 'portfolio/requests';
import { PostContentUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class PostContentController extends BaseController<
	PostContentEntity,
	PostContentUseCase,
	PostContentRequest
> {
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
