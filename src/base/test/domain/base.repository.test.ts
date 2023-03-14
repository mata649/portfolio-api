import { createFilters, Filters } from '@/base/domain/base.repository';

interface Testing {
	id: string;
	foo: string;
}

describe('createFilters', () => {
	test('should return a default Filters object if no arguments are provided', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({});
		expect(result).toEqual(expected);
	});

	test('should sets undefined values to default values', () => {
		const expected: Filters<Testing> = {
			filters: { foo: 'bar' },
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ filters: { foo: 'bar' } });
		expect(result).toEqual(expected);
	});

	test('should sets NaN limit to default limit', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ limit: NaN });
		expect(result).toEqual(expected);
	});

	test('should sets NaN page to default page', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ page: NaN });
		expect(result).toEqual(expected);
	});

	test('should return Filters object with provided values', () => {
		const expected: Filters<Testing> = {
			filters: { foo: 'bar' },
			limit: 20,
			page: 3,
			orderBy: [{ by: 'baz', order: 'asc' }],
		};
		const result = createFilters({
			filters: { foo: 'bar' },
			limit: 20,
			page: 3,
			orderBy: [{ by: 'baz', order: 'asc' }],
		});
		expect(result).toEqual(expected);
	});
});
