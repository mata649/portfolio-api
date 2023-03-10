import { Response, Request } from 'express';
import {
	createPostEntity,
	PostEntity,
	PostRepository,
	PostRequest,
	PostUseCase,
} from '@/post/domain';
import { PostContentRepository } from '@/postContent/domain';
import { BaseController } from '@/base/rest/base.controller';
/**
 * Class that handle CRUD operations for the post entities,
 * It extends the BaseController class and inject the needed dependencies
 */
export class PostController extends BaseController<
	PostEntity,
	PostUseCase,
	PostRequest
> {
	/**
	 * Creates a new PostRequest instance, and call the super constructor to pass those dependencies
	 *
	 * @param postRepository - Repository for the post entities
	 * @param postContentRepository - Repository for the post content
	 */
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
	/**
	 * This method handles the retrieval of the post content, using the slug from the request parameters.
	 * It creates a request object using the baseRequest's getPostContentBySlug method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
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
