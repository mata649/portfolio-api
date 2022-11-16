import { createPostContentEntity, PostContentEntity } from 'portfolio/entities';
import { PostContentUseCase } from 'portfolio/useCases';
import { BaseController } from './baseController';

export class PostContentController extends BaseController<
	PostContentEntity,
	PostContentUseCase
> {
	constructor(postContentUseCase: PostContentUseCase) {
		super(postContentUseCase, createPostContentEntity);
	}
}
