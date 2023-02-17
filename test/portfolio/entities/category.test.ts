import {
	CategoryEntity,
	createCategoryEntity,
} from 'portfolio/entities';

describe('createCategoryEntity', () => {
	it('creates a new CategoryEntity object with default values', () => {
		const expected: CategoryEntity = {
			id: '',
			name: '',
			color: '',
		};
		const actual = createCategoryEntity({});
		expect(actual).toEqual(expected);
	});

	it('creates a new CategoryEntity object with specified values', () => {
		const expected: CategoryEntity = {
			id: '123',
			name: 'Books',
			color: '#FF0000',
		};
		const actual = createCategoryEntity({
			id: '123',
			name: 'Books',
			color: '#FF0000',
		});
		expect(actual).toEqual(expected);
	});
});
