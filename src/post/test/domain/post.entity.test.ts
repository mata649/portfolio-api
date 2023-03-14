import { createPostEntity, PostEntity } from "@/post/domain";

describe('createPostEntity', () => {
	it('creates a new PostEntity object with default values', () => {
		const expected: PostEntity = {
			id: '',
			slug: '',
			defaultTitle: '',
			publishedDate: null,
		};
		const actual = createPostEntity({});
		expect(actual).toEqual(expected);
	});

	it('creates a new PostEntity object with specified values', () => {
		const expected: PostEntity = {
			id: '123',
			slug: 'my-first-post',
			defaultTitle: 'My First Post',
			publishedDate: new Date('2022-01-01'),
		};
		const actual = createPostEntity({
			id: '123',
			slug: 'my-first-post',
			defaultTitle: 'My First Post',
			publishedDate: new Date('2022-01-01'),
		});
		expect(actual).toEqual(expected);
	});
});
