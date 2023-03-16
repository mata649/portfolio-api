import { Results } from '@/base/domain/base.repository';
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
import { GetPostContentBySlug, PostEntity, PostUseCase } from '@/post/domain';
import {
	Languages,
	PostContentEntity,
} from '@/postContent/domain';

const postRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	update: jest.fn(),
	getBySlug: jest.fn(),
};

const postContentRepositoryMock = {
	create: jest.fn(),
	delete: jest.fn(),
	get: jest.fn(),
	getById: jest.fn(),
	update: jest.fn(),
};
describe('PostUseCase', () => {
	let postUseCase: PostUseCase;
	beforeEach(() => {
		postUseCase = new PostUseCase(
			postRepositoryMock,
			postContentRepositoryMock
		);
		jest.clearAllMocks();
	});
	describe('create', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({ error: 'slug empty', parameter: 'slug' });

			const result = await postUseCase.create(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'slug empty',
						parameter: 'slug',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const createRequest = new CreateRequest<PostEntity>({
				id: '',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});
			postRepositoryMock.getBySlug.mockResolvedValue(null);
			postRepositoryMock.create.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await postUseCase.create(createRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a conflict error when the slug already exists', async () => {
			const createRequest = new CreateRequest<PostEntity>({
				id: '',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});

			postRepositoryMock.getBySlug.mockResolvedValue({
				id: '3',
				defaultTitle: 'Another Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});

			const result = await postUseCase.create(createRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.CONFLICT);
			expect(result.value).toEqual({
				message: 'slug already exists',
			});
		});
		test('should return a response success when the object is created', async () => {
			const createRequest = new CreateRequest<PostEntity>({
				id: '',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});
			const expectedValue: PostEntity = {
				id: '1',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			};
			postRepositoryMock.getBySlug.mockResolvedValue(null);
			postRepositoryMock.create.mockResolvedValue(expectedValue);

			const result = await postUseCase.create(createRequest);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual(expectedValue);
		});
	});
	describe('update', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({ error: 'slug empty', parameter: 'slug' });

			const result = await postUseCase.update(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'slug empty',
						parameter: 'slug',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const updateRequest = new UpdateRequest<PostEntity>({
				id: '1',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});
			postRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await postUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the post does not exist', async () => {
			const updateRequest = new UpdateRequest<PostEntity>({
				id: '1',
				defaultTitle: 'Testing Title',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});

			postRepositoryMock.getById.mockResolvedValue(null);

			const result = await postUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'post does not exist',
			});
		});
		test('should return a response failure with a conflict error when the slug already exists in a different post', async () => {
			const updateRequest = new UpdateRequest<PostEntity>({
				id: '1',
				defaultTitle: 'Testing Title to Update',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});

			postRepositoryMock.getById.mockResolvedValue({
				id: '1',
				defaultTitle: 'Testing Title Found',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});
			postRepositoryMock.getBySlug.mockResolvedValue({
				id: '3',
				defaultTitle: 'Another Title Found By Slug',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});

			const result = await postUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.CONFLICT);
			expect(result.value).toEqual({
				message: 'slug already exists',
			});
		});
		test('should return a response success when the object is updated', async () => {
			const expectedValue: PostEntity = {
				id: '1',
				defaultTitle: 'Testing Title to Update',
				publishedDate: null,
				slug: 'testing-slug',
			};
			const updateRequest = new UpdateRequest<PostEntity>(expectedValue);

			postRepositoryMock.getById.mockResolvedValue({
				id: '1',
				defaultTitle: 'Testing Title Found by ID',
				publishedDate: null,
				slug: 'testing-slug',
			});
			postRepositoryMock.getBySlug.mockResolvedValue({
				id: '1',
				defaultTitle: 'Testing Title Found by ID',
				publishedDate: null,
				slug: 'testing-slug',
			});

			postRepositoryMock.update.mockResolvedValue(expectedValue);

			const result = await postUseCase.update(updateRequest);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(expectedValue);
		});
	});
	describe('getPostContentBySlug', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({ error: 'slug empty', parameter: 'slug' });

			const result = await postUseCase.getPostContentBySlug(
				invalidRequest
			);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'slug empty',
						parameter: 'slug',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const getPostContentBySlug = new GetPostContentBySlug('slug-post');
			postRepositoryMock.getBySlug.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await postUseCase.getPostContentBySlug(
				getPostContentBySlug
			);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the post does not exist', async () => {
			const getPostContentBySlugRequest = new GetPostContentBySlug(
				'post-slug'
			);

			postRepositoryMock.getBySlug.mockResolvedValue(null);

			const result = await postUseCase.getPostContentBySlug(
				getPostContentBySlugRequest
			);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'post does not exist',
			});
		});
		test('should return a response failure with a resource error when the content does not exist', async () => {
			const getPostContentBySlugRequest = new GetPostContentBySlug(
				'testing-slug'
			);

			postRepositoryMock.getBySlug.mockResolvedValue({
				id: '1',
				defaultTitle: 'Testing Title Found',
				publishedDate: new Date(),
				slug: 'testing-slug',
			});
			postContentRepositoryMock.get.mockResolvedValue({
				data: [],
				currentPage: 0,
				totalPages: 0,
			});
			const result = await postUseCase.getPostContentBySlug(
				getPostContentBySlugRequest
			);

			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'content does not exists',
			});
		});
		test('should return a response success when the content was found', async () => {
			const todayDate = new Date();
			const postFound: PostEntity = {
				id: '1',
				defaultTitle: 'Testing Title to Update',
				publishedDate: todayDate,
				slug: 'testing-slug',
			};
			const postContentsFound: Results<PostContentEntity> = {
				data: [
					{
						content: 'post content',
						id: '1',
						idPost: '1',
						language: Languages.ENG,
						title: 'post title',
					},
					{
						content: 'post content 2',
						id: '2',
						idPost: '1',
						language: Languages.ESP,
						title: 'post title 2',
					},
				],
				currentPage: 0,
				totalPages: 0,
			};
			const getPostContentBySlugRequest = new GetPostContentBySlug(
				'testing-slug'
			);

			postRepositoryMock.getBySlug.mockResolvedValue(postFound);
			postContentRepositoryMock.get.mockResolvedValue(postContentsFound);

			const result = await postUseCase.getPostContentBySlug(
				getPostContentBySlugRequest
			);

			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual({
				...postContentsFound,
				publishedDate: postFound.publishedDate,
			});
		});
	});
});
