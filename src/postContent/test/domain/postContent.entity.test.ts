import { createPostContentEntity, Languages, PostContentEntity } from "@/postContent/domain";


describe('createPostContentEntity', () => {
	it('creates a new PostContentEntity object with default values', () => {
		const expected: PostContentEntity = {
			id: '',
			idPost: '',
			language: Languages.NONE,
			title: '',
			content: '',
		};
		const actual = createPostContentEntity({});
		expect(actual).toEqual(expected);
	});

	it('creates a new PostContentEntity object with specified values', () => {
		const expected: PostContentEntity = {
			id: '456',
			idPost: '12312',
			language: Languages.ENG,
			title: 'My First Post in English',
			content: 'This is the content of my first post in English.',
		};
		const actual = createPostContentEntity({
			id: '456',
			idPost: '12312',
			language: Languages.ENG,
			title: 'My First Post in English',
			content: 'This is the content of my first post in English.',
		});
		expect(actual).toEqual(expected);
	});
});
