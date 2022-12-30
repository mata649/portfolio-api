import { PostContentEntity } from 'portfolio/entities';
import { Languages } from 'portfolio/entities/language';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';

export class PostContentRequest extends BaseRequest<PostContentEntity> {
	create = (
		postContent: PostContentEntity
	): InvalidRequest | CreateRequest<PostContentEntity> => {
		let invalidRequest = new InvalidRequest();
		const allowedLanguages = Object.values(Languages);
		invalidRequest = this.validateEmptyFields(postContent, invalidRequest, [
			'language',
			'id',
		]);
		if (postContent.language === Languages.NONE) {
			invalidRequest.addError({
				error: 'language',
				parameter: 'language empty',
			});
		} else if (!allowedLanguages.includes(postContent.language)) {
			invalidRequest.addError({
				error: 'language',
				parameter: `language is not accepted, language must to be ${allowedLanguages.join(
					', '
				)}`,
			});
		}
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new CreateRequest(postContent);
	};
	update(
		postContent: PostContentEntity
	): InvalidRequest | UpdateRequest<PostContentEntity> {
		let invalidRequest = new InvalidRequest();
		const allowedLanguages = Object.values(Languages);
		invalidRequest = this.validateEmptyFields(postContent, invalidRequest, [
			'language',
		]);

		if (postContent.language === Languages.NONE) {
			invalidRequest.addError({
				error: 'language',
				parameter: 'language empty',
			});
		} else if (!allowedLanguages.includes(postContent.language)) {
			invalidRequest.addError({
				error: 'language',
				parameter: `language is not accepted, language must to be ${allowedLanguages.join(
					', '
				)}`,
			});
		}
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new UpdateRequest(postContent)
	}
}
