import { PostContentEntity } from 'portfolio/entities';
import {
	createFilters,
	PostContentRepository,
	PostRepository,
} from 'portfolio/repositories';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'portfolio/response';

import { BaseUseCase } from './baseUseCase';

export class PostContentUseCase extends BaseUseCase<
	PostContentEntity,
	PostContentRepository
> {
	constructor(
		postContentRepository: PostContentRepository,
		protected readonly postRepository: PostRepository
	) {
		super(postContentRepository, 'Post content');
	}

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

	async create(
		postContent: PostContentEntity
	): Promise<ResponseSuccess | ResponseFailure> {
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
					ResponseTypes.RESOURCE_ERROR,
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
	async update(
		postContent: PostContentEntity
	): Promise<ResponseSuccess | ResponseFailure> {
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
					ResponseTypes.RESOURCE_ERROR,
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
