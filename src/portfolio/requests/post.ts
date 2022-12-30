import { PostEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';
export class GetPostContentBySlug {
	constructor(public value: string) {}
}
export class PostRequest extends BaseRequest<PostEntity> {
	private parseSlug(slug: PostEntity['slug']): PostEntity['slug'] {
		let parsedSlug = slug.replace(/ /g, '-');
		parsedSlug = parsedSlug.replace(/\//gi, '-');
		parsedSlug = parsedSlug.toLowerCase();
		return parsedSlug;
	}

	create = (post: PostEntity): InvalidRequest | CreateRequest<PostEntity> => {
		let invalidRequest = new InvalidRequest();

		post.publishedDate = new Date();

		invalidRequest = this.validateEmptyFields(post, invalidRequest, [
			'id',
			'slug',
		]);

		if (post.slug.length < 1) {
			invalidRequest.addError({
				error: 'slug empty',
				parameter: 'slug',
			});
		} else {
			post.slug = this.parseSlug(post.slug);
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(post);
	};
	update(post: PostEntity): InvalidRequest | UpdateRequest<PostEntity> {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(post, invalidRequest, [
			'slug',
		]);

		if (post.slug.length < 1) {
			invalidRequest.addError({
				error: 'slug empty',
				parameter: 'slug',
			});
		} else {
			post.slug = this.parseSlug(post.slug);
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(post);
	}
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
		if (invalidRequest.hasErrors()){
			return invalidRequest
		}
		return new GetPostContentBySlug(slug)
	}
}
