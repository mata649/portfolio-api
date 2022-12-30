import { Response, Request } from 'express';
import { createPostEntity, PostEntity } from 'portfolio/entities';
import { PostContentRepository, PostRepository } from 'portfolio/repositories';
import { PostRequest } from 'portfolio/requests';
import { PostUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class PostController extends BaseController<
	PostEntity,
	PostUseCase,
	PostRequest
> {
	constructor(
		postRepository: PostRepository,
		postContentRepository: PostContentRepository
	) {
		const postUseCase = new PostUseCase(
			postRepository,
			postContentRepository
		);
		const postRequest = new PostRequest();
		super(postUseCase, createPostEntity, postRequest);
	}
	getPostContentBySlug = async (req: Request, res: Response) => {
		const requestObject = this.baseRequest.getPostContentBySlug(
			req.params.slug
		);
		const response = await this.baseUseCase.getPostContentBySlug(
			requestObject
		);
		res.status(response.type).json(response.value);
	};
}
