import { PostContentEntity } from '.';
import { PostContentRepository } from '.';

import { PostRepository } from '@/post/domain';
import {
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from '@/base/domain/response';

import { BaseUseCase } from '@/base/domain/base.useCases';
import { createFilters } from '@/base/domain/base.repository';
/**
 * Provides CRUD functionality for a repository of post content.
 */
export class PostContentUseCase extends BaseUseCase<
	PostContentEntity,
	PostContentRepository
> {
	/**
	 * Constructs a new PostContentUseCase.
	 * @param postContentRepository An instance of a repository of post contents.
	 * @param postRepository An instance of a repository of posts.
	 */
	constructor(
		postContentRepository: PostContentRepository,
		protected postRepository: PostRepository
	) {
		super(postContentRepository, 'Post content');
	}
	/**
	 * Check if a given postContent object has already been written in the specified language.
	 *
	 * @param postContent The postContent object to check.
	 * @returns A boolean indicating whether the language of the given postContent object has already been written.
	 */
	private async theLanguageIsAlreadyWritten(
		postContent: PostContentEntity
	): Promise<boolean> {
		const postsContentFound = await this.baseRepository.get(
			createFilters<PostContentEntity>({
				filters: { idPost: postContent.idPost },
			})
		);

		const listFiltered = postsContentFound?.data.filter(
			({ language }) => language == postContent.language
		);
		return listFiltered ? listFiltered.length > 0 : false;
	}
	/**
	 * Creates a new post content in the repository.
	 * @param request A CreateRequest object containing the new post content or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the new post content if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
	async create(
		request: CreateRequest<PostContentEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const postContent = request.value;
		try {
			//Check if post exists
			const postFound = await this.postRepository.getById(
				postContent.idPost
			);
			if (!postFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'post does not exist'
				);
			}
			// Check if a postContent with the designed language was created previously
			if (await this.theLanguageIsAlreadyWritten(postContent)) {
				return new ResponseFailure(
					ResponseTypes.CONFLICT,
					'the content was already written in this language'
				);
			}
			const postContentCreated = await this.baseRepository.create(
				postContent
			);

			return new ResponseSuccess(
				ResponseTypes.CREATED,
				postContentCreated
			);
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}

	/**
	 * Updates an existing post content in the repository.
	 * @param request An UpdateRequest object containing the updated post content or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the updated post content if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
	async update(
		request: UpdateRequest<PostContentEntity> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const postContent = request.value;
		try {
			// Check if postContent exists
			const postContentFound = await this.baseRepository.getById(
				postContent.id
			);
			if (!postContentFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'post content does not exist'
				);
			}

			//Check if post exists
			if (!(await this.postRepository.getById(postContent.idPost))) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					'post does not exist'
				);
			}

			// Check if a postContent with the designed language was created previously
			if (
				(await this.theLanguageIsAlreadyWritten(postContent)) &&
				postContentFound.language !== postContent.language
			) {
				return new ResponseFailure(
					ResponseTypes.CONFLICT,
					'the content was already written in this language'
				);
			}
			const postContentUpdated = await this.baseRepository.update(
				postContent
			);

			return new ResponseSuccess(
				ResponseTypes.CREATED,
				postContentUpdated
			);
		} catch (error) {
			console.log(error);
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
}
