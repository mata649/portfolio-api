import {
	CreateRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';
import {
	createPostContentEntity,
	Languages,
	PostContentRequest,
} from '@/postContent/domain';

describe('PostContentRequest', () => {
	let postContentRequest: PostContentRequest;

	beforeEach(() => {
		postContentRequest = new PostContentRequest();
	});
	describe('create', () => {
		test('should return a CreateRequest when post content is valid', () => {
			const item = createPostContentEntity({
				content: 'post content',
				id: '',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const result = postContentRequest.create(item);
			expect(result).toBeInstanceOf(CreateRequest);
			if (result instanceof CreateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when language, idPost, title or content are empty strings', () => {
			const item = createPostContentEntity({
				content: '',
				id: '',
				idPost: '',
				language: Languages.NONE,
				title: '',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'idPost empty',
					parameter: 'idPost',
				},
				{
					error: 'title empty',
					parameter: 'title',
				},
				{
					error: 'content empty',
					parameter: 'content',
				},
				{
					error: 'language empty',
					parameter: 'language',
				},
			];
			const result = postContentRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
		test('should return InvalidRequest when language is not accepted', () => {
			const item = createPostContentEntity({
				content: 'post content',
				id: '',
				idPost: '1',
				language: 'FRENCH' as Languages,
				title: 'post title',
			});
			const expectedValue: RequestError[] = [
				{
					error: `language is not accepted, language must to be ${Object.values(
						Languages
					).join(', ')}`,
					parameter: 'language',
				},
			];
			const result = postContentRequest.create(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
	});
	describe('update', () => {
		test('should return UpdateRequest when post content is valid', () => {
			const item = createPostContentEntity({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const result = postContentRequest.update(item);
			expect(result).toBeInstanceOf(UpdateRequest);
			if (result instanceof UpdateRequest) {
				expect(result.value).toEqual(item);
			}
		});
		test('should return an InvalidRequest when id, language, idPost, title or content are empty strings', () => {
			const item = createPostContentEntity({
				content: '',
				id: '',
				idPost: '',
				language: Languages.NONE,
				title: '',
			});
			const expectedValue: RequestError[] = [
				{
					error: 'id empty',
					parameter: 'id',
				},
				{
					error: 'idPost empty',
					parameter: 'idPost',
				},
				{
					error: 'title empty',
					parameter: 'title',
				},
				{
					error: 'content empty',
					parameter: 'content',
				},
				{
					error: 'language empty',
					parameter: 'language',
				},
			];
			const result = postContentRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
		test('should return InvalidRequest when language is not accepted', () => {
			const item = createPostContentEntity({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: 'FRENCH' as Languages,
				title: 'post title',
			});
			const expectedValue: RequestError[] = [
				{
					error: `language is not accepted, language must to be ${Object.values(
						Languages
					).join(', ')}`,
					parameter: 'language',
				},
			];
			const result = postContentRequest.update(item);
			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toEqual(expectedValue);
			}
		});
	});
});
