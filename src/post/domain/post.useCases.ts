import { GetPostContentBySlug, PostEntity, PostRepository } from '.';
import { PostContentEntity, PostContentRepository } from '@/postContent/domain';

import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';
import { BaseUseCase } from '@/base/domain/base.useCases';
import {
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
import { createFilters } from '@/base/domain/base.repository';

/**
 * Provides CRUD functionality for a repository of posts.
 */
export class PostUseCase extends BaseUseCase<PostEntity, PostRepository> {
	/**
	 * Constructs a new PostUseCase.
	 * @param postRepository An instance of a repository of posts.
	 * @param postContentRepository An instance of a repository of post contents.
	 */
	constructor(
		postRepository: PostRepository,
		private postContentRepository: PostContentRepository
	) {
		super(postRepository, 'Post');
	}
	/**
	 * Creates a new post in the repository.
	 * @param request A CreateRequest object containing the new post or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the new post if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
					ResponseTypes.CONFLICT,
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
	/**
	 * Updates an existing post in the repository.
	 * @param request An UpdateRequest object containing the updated post or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the updated post if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
					ResponseTypes.CONFLICT,
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
	/**
	 * Gets the post content for a post with a given slug.
	 * @param request A GetPostContentBySlug object containing the slug or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the post content if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
					'post does not exists'
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
					'content does not exists'
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
