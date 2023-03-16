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
import { createPostEntity } from '@/post/domain';
import {
	createPostContentEntity,
	Languages,
	PostContentEntity,
	PostContentUseCase,
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

describe('PostContentUseCases', () => {
	let postContentUseCase: PostContentUseCase;
	beforeEach(() => {
		postContentUseCase = new PostContentUseCase(
			postContentRepositoryMock,
			postRepositoryMock
		);
		jest.clearAllMocks();
	});
	describe('theLanguageIsAlreadyWritten', () => {
		test('should return false if the content is not already written in the language', async () => {
			const item = createPostContentEntity({
				content: 'post content',
				language: Languages.ENG,
				idPost: '1',
				title: 'post title',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'contenido de post',
						id: '1',
						idPost: '1',
						title: 'titulo post',
						language: Languages.ESP,
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			const result = await postContentUseCase.theLanguageIsAlreadyWritten(
				item
			);
			expect(result).toEqual(false);
		});
		test('should return true if the content is already written in the language', async () => {
			const item = createPostContentEntity({
				content: 'post content',
				language: Languages.ESP,
				idPost: '1',
				title: 'post title',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'contenido de post',
						id: '1',
						idPost: '1',
						title: 'titulo post',
						language: Languages.ESP,
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			const result = await postContentUseCase.theLanguageIsAlreadyWritten(
				item
			);
			expect(result).toEqual(true);
		});
	});
	describe('create', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'content empty',
				parameter: 'content',
			});

			const result = await postContentUseCase.create(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'content empty',
						parameter: 'content',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const request = new CreateRequest<PostContentEntity>({
				content: 'post content',
				id: '',
				idPost: '1',
				language: Languages.ESP,
				title: 'post title',
			});
			postRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await postContentUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the post was not found', async () => {
			const request = new CreateRequest<PostContentEntity>({
				content: 'post content',
				id: '',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			postRepositoryMock.getById.mockResolvedValue(null);
			const result = await postContentUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'post does not exist',
			});
		});
		test('should return a response failure with a conflict error when post content was already written', async () => {
			const request = new CreateRequest<PostContentEntity>({
				content: 'post content',
				id: '',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const postFound = createPostEntity({
				defaultTitle: 'default title',
				id: '1',
				publishedDate: new Date(),
				slug: 'post-slug',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'post content',
						id: '1',
						idPost: '1',
						language: Languages.ENG,
						title: 'post title',
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postRepositoryMock.getById.mockResolvedValue(postFound);
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			const result = await postContentUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.CONFLICT);
			expect(result.value).toEqual({
				message: 'the content was already written in this language',
			});
		});
		test('should return a response success with the post content created when post content is created', async () => {
			const request = new CreateRequest<PostContentEntity>({
				content: 'post content',
				id: '',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const postFound = createPostEntity({
				defaultTitle: 'default title',
				id: '1',
				publishedDate: new Date(),
				slug: 'post-slug',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'contenido post',
						id: '',
						idPost: '1',
						language: Languages.ESP,
						title: 'titulo post',
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postRepositoryMock.getById.mockResolvedValue(postFound);
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			postContentRepositoryMock.create.mockResolvedValue({
				...request.value,
				id: '1',
			});
			const result = await postContentUseCase.create(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.CREATED);
			expect(result.value).toEqual({ ...request.value, id: '1' });
		});
	});
	describe('update', () => {
		test('should return a response failure with a bad request when request is invalid', async () => {
			const invalidRequest = new InvalidRequest();
			invalidRequest.addError({
				error: 'content empty',
				parameter: 'content',
			});

			const result = await postContentUseCase.update(invalidRequest);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.BAD_REQUEST);
			expect(result.value).toEqual({
				message: [
					{
						error: 'content empty',
						parameter: 'content',
					},
				],
			});
		});
		test('should return a response failure with a system error when an error happens', async () => {
			const request = new UpdateRequest<PostContentEntity>({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ESP,
				title: 'post title',
			});
			postContentRepositoryMock.getById.mockRejectedValue(
				new Error('Something went wrong')
			);
			const result = await postContentUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.SYSTEM_ERROR);
			expect(result.value).toEqual({
				message: 'system error',
			});
		});
		test('should return a response failure with a resource error when the post content was not found', async () => {
			const request = new UpdateRequest<PostContentEntity>({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			postContentRepositoryMock.getById.mockResolvedValue(null);
			const result = await postContentUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'post content does not exist',
			});
		});
		test('should return a response failure with a resource error when the post was not found', async () => {
			const request = new UpdateRequest<PostContentEntity>({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			postContentRepositoryMock.getById.mockResolvedValue(request.value);
			postRepositoryMock.getById.mockResolvedValue(null);
			const result = await postContentUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.RESOURCE_ERROR);
			expect(result.value).toEqual({
				message: 'post does not exist',
			});
		});
		test('should return a response failure with a conflict error when post content was already written', async () => {
			const request = new UpdateRequest<PostContentEntity>({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const postFound = createPostEntity({
				defaultTitle: 'default title',
				id: '1',
				publishedDate: new Date(),
				slug: 'post-slug',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'post content',
						id: '2',
						idPost: '1',
						language: Languages.ENG,
						title: 'post title',
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postContentRepositoryMock.getById.mockResolvedValue({
				...request.value,
				language: Languages.ESP,
			});
			postRepositoryMock.getById.mockResolvedValue(postFound);
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			const result = await postContentUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseFailure);
			expect(result.type).toEqual(ResponseTypes.CONFLICT);
			expect(result.value).toEqual({
				message: 'the content was already written in this language',
			});
		});
		test('should return a response success with the post content updated when post content is updated', async () => {
			const request = new UpdateRequest<PostContentEntity>({
				content: 'post content',
				id: '1',
				idPost: '1',
				language: Languages.ENG,
				title: 'post title',
			});
			const postFound = createPostEntity({
				defaultTitle: 'default title',
				id: '1',
				publishedDate: new Date(),
				slug: 'post-slug',
			});
			const getResult: Results<PostContentEntity> = {
				data: [
					{
						content: 'contenido post',
						id: '',
						idPost: '1',
						language: Languages.ESP,
						title: 'titulo post',
					},
				],
				currentPage: 1,
				totalPages: 1,
			};
			postContentRepositoryMock.getById.mockResolvedValue(request.value);
			postRepositoryMock.getById.mockResolvedValue(postFound);
			postContentRepositoryMock.get.mockResolvedValue(getResult);
			postContentRepositoryMock.update.mockResolvedValue({
				...request.value,
				id: '1',
			});
			const result = await postContentUseCase.update(request);
			expect(result).toBeInstanceOf(ResponseSuccess);
			expect(result.type).toEqual(ResponseTypes.OK);
			expect(result.value).toEqual(request.value);
		});
	});
});
