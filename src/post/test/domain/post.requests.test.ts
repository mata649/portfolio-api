import {
	CreateRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';
import {
	createPostEntity,
	GetPostContentBySlug,
	PostRequest,
} from '@/post/domain';

describe('GetPostContentBySlug', () => {
	test('should create a new instance of GetPostContentBySlug', () => {
		const getPostContentBySlug = new GetPostContentBySlug('slug-to-test');
		expect(getPostContentBySlug.value).toEqual('slug-to-test');
	});
});

describe('PostRequest', () => {
	let postRequest: PostRequest;
	beforeEach(() => {
		postRequest = new PostRequest();
	});
	describe('parseSlug', () => {
		test('should first', () => {
			const expectedSlug = 'slug-to-test';
			const result = postRequest.parseSlug('SLUG to/test');
			expect(result).toEqual(expectedSlug);
		});
	});
	describe('create', () => {
		test('should return a CreateRequest when post is valid', () => {
			const item = createPostEntity({
				defaultTitle: 'Testing Title',
				slug: 'slug-to-test',
			});
			const result = postRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when defaultTitle is an empty string', () => {
			const item = createPostEntity({
				slug: 'testing-slug',
			});
			const result = postRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('defaultTitle empty');
				expect(result.errors[0].parameter).toEqual('defaultTitle');
			}
		});
		test('should return an InvalidRequest when slug is an empty string', () => {
			const item = createPostEntity({
				defaultTitle: 'Testing Title',
			});
			const result = postRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('slug empty');
				expect(result.errors[0].parameter).toEqual('slug');
			}
		});
	});

	describe('update', () => {
		test('should return a UpdateRequest when post is valid', () => {
			const item = createPostEntity({
				id: '1',
				defaultTitle: 'Testing Title',
				slug: 'slug-to-test',
			});
			const result = postRequest.update(item);
			expect(result).toBeInstanceOf(UpdateRequest);
			if (result instanceof UpdateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when defaultTitle or id are empty strings', () => {
			const expectedValue: RequestError[] = [
				{ error: 'id empty', parameter: 'id' },
				{ error: 'defaultTitle empty', parameter: 'defaultTitle' },
			];
			const item = createPostEntity({
				slug: 'testing-slug',
			});
			const result = postRequest.update(item);

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
		test('should return an InvalidRequest when slug is an empty string', () => {
			const item = createPostEntity({
				id: '1',
				defaultTitle: 'Testing Title',
			});
			const result = postRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('slug empty');
				expect(result.errors[0].parameter).toEqual('slug');
			}
		});
	});
	describe('getPostContentBySlug', () => {
		test('should return a GetPostContentBySlug object when slug is valid', () => {
			const result = postRequest.getPostContentBySlug('testing-slug');
			expect(result).toBeInstanceOf(GetPostContentBySlug);
			if (result instanceof GetPostContentBySlug) {
				expect(result.value).toEqual('testing-slug');
			}
		});

		test('should return an InvalidRequest if slug is an empty string', () => {
			const result = postRequest.getPostContentBySlug('');
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual('slug empty');
				expect(result.errors[0].parameter).toEqual('slug');
			}
		});

		test('should return an InvalidRequest if slug is invalid', () => {
			const result = postRequest.getPostContentBySlug('slug/invalid a');
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors[0].error).toEqual(
					'slug format is incorrect'
				);
				expect(result.errors[0].parameter).toEqual('slug');
			}
		});
	});
});
