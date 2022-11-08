import { Response, Request } from 'express';
import { createPostEntity, PostEntity } from 'domain/entities';
import { PostUseCase } from 'domain/useCases';
import { BaseController } from './baseController';

export class PostController extends BaseController<PostEntity, PostUseCase> {
	constructor(postUseCase: PostUseCase) {
		super(postUseCase, createPostEntity);
	}
	getPostContentBySlug = async (req: Request, res: Response) => {
		const response = await this.baseUseCase.getPostContentBySlug(req.params.slug);
		res.status(response.type).json(response.value);
	};
}
