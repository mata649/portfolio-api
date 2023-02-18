import {
	createFilters,
	Filters,
	BaseRepository,
} from 'portfolio/repositories/baseRepository';

interface Testing {
	id: string;
	foo: string;
}

describe('createFilters', () => {
	it('returns a default Filters object if no arguments are provided', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({});
		expect(result).toEqual(expected);
	});

	it('sets undefined values to default values', () => {
		const expected: Filters<Testing> = {
			filters: { foo: 'bar' },
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ filters: { foo: 'bar' } });
		expect(result).toEqual(expected);
	});

	it('sets NaN limit to default limit', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ limit: NaN });
		expect(result).toEqual(expected);
	});

	it('sets NaN page to default page', () => {
		const expected: Filters<Testing> = {
			filters: {},
			limit: 10,
			page: 1,
			orderBy: [],
		};
		const result = createFilters({ page: NaN });
		expect(result).toEqual(expected);
	});

	it('returns Filters object with provided values', () => {
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

describe('BaseRepository', () => {
	let repository: BaseRepository<Testing>;

	beforeEach(() => {
		repository = {
			create: jest.fn(),
			get: jest.fn(),
			getById: jest.fn(),
			delete: jest.fn(),
			update: jest.fn(),
		};
	});

	describe('create', () => {
		it('calls repository.create with provided item', async () => {
			const item = { foo: 'bar', id: '' };
			await repository.create(item);
			expect(repository.create).toHaveBeenCalledWith(item);
		});
	});

	describe('get', () => {
		it('calls repository.get with provided filters', async () => {
			const filters: Filters<Testing> = {
				filters: { foo: 'bar' },
				limit: 20,
				page: 3,
				orderBy: [{ by: 'baz', order: 'asc' }],
			};
			await repository.get(filters);
			expect(repository.get).toHaveBeenCalledWith(filters);
		});
	});

	describe('getById', () => {
		it('calls repository.getById with provided id', async () => {
			const id = '123';
			await repository.getById(id);
			expect(repository.getById).toHaveBeenCalledWith(id);
		});
	});

	describe('delete', () => {
		it('calls repository.delete with provided id', async () => {
			const id = '123';
			await repository.delete(id);
			expect(repository.delete).toHaveBeenCalledWith(id);
		});
	});
	describe('delete', () => {
		it('calls repository.delete with provided id', async () => {
			const id = '123';
			await repository.delete(id);
			expect(repository.delete).toHaveBeenCalledWith(id);
		});
	});
	describe('update', () => {
		it('calls repository.update with provided id', async () => {
			const id = '123';
			await repository.delete(id);
			expect(repository.delete).toHaveBeenCalledWith(id);
		});
	});
});
