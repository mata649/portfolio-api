import { PostEntity } from 'portfolio/entities';
import { PostContentRepository, PostRepository } from 'portfolio/repositories';
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

	private parseSlug(slug: PostEntity['slug']): PostEntity['slug'] {
		let parsedSlug = slug.replace(' ', '-');
		parsedSlug = parsedSlug.replace('/', '-');
		parsedSlug = parsedSlug.toLowerCase();
		return parsedSlug;
	}
	async create(post: PostEntity): Promise<ResponseSuccess | ResponseFailure> {
		try {
			post.slug = this.parseSlug(post.slug);
			const postFound = await this.baseRepository.getBySlug(post.slug);
			if (postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'slug already exists'
				);
			}
			post.publishedDate = new Date();
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
		post: Omit<PostEntity, 'publishedDate'>
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const postFound = await this.baseRepository.getById(post.id);
			if (!postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'post does not exists'
				);
			}

			post.slug = this.parseSlug(post.slug);
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
		slug: PostEntity['slug']
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const postFound = await this.baseRepository.getBySlug(slug);
			if (!postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'Post does not exists'
				);
			}

			const postContentsFound = await this.postContentRepository.get({
				idPost: postFound.id,
			});
			if (!postContentsFound || postContentsFound.length < 0) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'Content does not exists'
				);
			}
			return new ResponseSuccess(ResponseTypes.OK, postContentsFound);
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
