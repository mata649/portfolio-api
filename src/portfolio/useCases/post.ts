import { PostContentEntity, PostEntity } from 'portfolio/entities';
import { PostContentRepository, PostRepository } from 'portfolio/repositories';
import { createFilters } from 'portfolio/repositories/';
import {
	CreateRequest,
	GetPostContentBySlug,
	InvalidRequest,
	UpdateRequest,
} from 'portfolio/requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'portfolio/response';

import { BaseUseCase } from './baseUseCase';

export class PostUseCase extends BaseUseCase<PostEntity, PostRepository> {
	constructor(
		postRepository: PostRepository,
		private postContentRepository: PostContentRepository
	) {
		super(postRepository, 'Post');
	}

	async create(
		request: CreateRequest<PostEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const post = request.value;
		try {
			const postFound = await this.baseRepository.getBySlug(post.slug);
			if (postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'slug already exists'
				);
			}
			const postUpdated = await this.baseRepository.create(post);

			return new ResponseSuccess(ResponseTypes.CREATED, postUpdated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}

	async update(
		request:
			| UpdateRequest<Omit<PostEntity, 'publishedDate'>>
			| InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const post = request.value;
		try {
			const postFound = await this.baseRepository.getById(post.id);
			if (!postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'post does not exists'
				);
			}
			const postFoundBySlug = await this.baseRepository.getBySlug(
				post.slug
			);
			if (postFoundBySlug && post.id !== postFoundBySlug.id) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'slug already exists'
				);
			}
			const postUpdated = await this.baseRepository.update({
				defaultTitle: post.defaultTitle,
				id: post.id,
				slug: post.slug,
			});

			return new ResponseSuccess(ResponseTypes.CREATED, postUpdated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async getPostContentBySlug(
		request: GetPostContentBySlug | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const slug = request.value;
		try {
			const postFound = await this.baseRepository.getBySlug(slug);
			if (!postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'Post does not exists'
				);
			}

			const postContentsFound = await this.postContentRepository.get(
				createFilters<PostContentEntity>({
					filters: { idPost: postFound.id },
				})
			);
			if (!postContentsFound || postContentsFound.data.length < 0) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'Content does not exists'
				);
			}
			return new ResponseSuccess(ResponseTypes.OK, {
				...postContentsFound,
				publishedDate: postFound.publishedDate,
			});
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
