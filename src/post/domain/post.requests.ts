import { PostEntity } from '.';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
export class GetPostContentBySlug {
	constructor(public value: string) {}
}
/**
 * Class used to validate the Post's requests
 */
export class PostRequest extends BaseRequest<PostEntity> {
	/**
	 * Parses a slug to be "url friendly", replacing invalid characters
	 * to '-'
	 * @param slug - Slug to parse
	 * @returns The slug parsed
	 */
	public parseSlug(slug: PostEntity['slug']): PostEntity['slug'] {
		let parsedSlug = slug.replace(/ /g, '-');
		parsedSlug = parsedSlug.replace(/\//gi, '-');
		parsedSlug = parsedSlug.toLowerCase();
		return parsedSlug;
	}

	create = (item: PostEntity): InvalidRequest | CreateRequest<PostEntity> => {
		let invalidRequest = new InvalidRequest();

		item.publishedDate = new Date();

		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'id',
			'slug',
		]);

		if (item.slug.length < 1) {
			invalidRequest.addError({
				error: 'slug empty',
				parameter: 'slug',
			});
		} else {
			item.slug = this.parseSlug(item.slug);
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(item);
	};
	update(item: PostEntity): InvalidRequest | UpdateRequest<PostEntity> {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'slug',
		]);

		if (item.slug.length < 1) {
			invalidRequest.addError({
				error: 'slug empty',
				parameter: 'slug',
			});
		} else {
			item.slug = this.parseSlug(item.slug);
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(item);
	}
	/**
	 * Validates if a slug meets the requirements to get the post's content
	 * @param slug - Slug of the post's content to get
	 * @returns If the id meets the requirements, returns a `GetPostContentBySlug` object, else returns an `InvalidRequest` object
	 */
	getPostContentBySlug(slug: string): GetPostContentBySlug | InvalidRequest {
		const invalidRequest = new InvalidRequest();
		if (slug.length < 1) {
			invalidRequest.addError({
				error: 'slug empty',
				parameter: 'slug',
			});
		} else if (slug.includes('/') || slug.includes(' ')) {
			invalidRequest.addError({
				error: 'slug format is incorrect',
				parameter: 'slug',
			});
		}
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new GetPostContentBySlug(slug);
	}
}
