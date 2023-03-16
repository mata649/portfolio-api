import { PostContentEntity, Languages } from '.';

import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
/**
 * Class used to validate the Post's content requests
 */
export class PostContentRequest extends BaseRequest<PostContentEntity> {
	create = (
		item: PostContentEntity
	): InvalidRequest | CreateRequest<PostContentEntity> => {
		let invalidRequest = new InvalidRequest();
		const allowedLanguages = Object.values(Languages);
		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'language',
			'id',
		]);
		if (item.language === Languages.NONE) {
			invalidRequest.addError({
				error: 'language empty',
				parameter: 'language',
			});
		} else if (!allowedLanguages.includes(item.language)) {
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
		return new CreateRequest(item);
	};
	update(
		item: PostContentEntity
	): InvalidRequest | UpdateRequest<PostContentEntity> {
		let invalidRequest = new InvalidRequest();
		const allowedLanguages = Object.values(Languages);
		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'language',
		]);

		if (item.language === Languages.NONE) {
			invalidRequest.addError({
				error: 'language',
				parameter: 'language empty',
			});
		} else if (!allowedLanguages.includes(item.language)) {
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
		return new UpdateRequest(item);
	}
}
