import { Filters, OrderBy } from '@/base/domain/base.repository';
import {
	BaseRequest,
	CreateRequest,
	DeleteRequest,
	GetByIdRequest,
	GetRequest,
	InvalidRequest,
	RequestError,
	UpdateRequest,
} from '@/base/domain/base.requests';

interface Testing {
	id: string;
	name: string;
	age: number;
}
describe('requests', () => {
	describe('CreateRequest', () => {
		test('should create a new instance with a value', () => {
			const value = { name: 'John', age: 30, id: '1' };
			const request = new CreateRequest<Testing>(value);
			expect(request.value).toEqual(value);
		});
	});

	describe('UpdateRequest', () => {
		test('should create a new instance with a value', () => {
			const value = { name: 'John', age: 30, id: '1' };
			const request = new UpdateRequest<Testing>(value);
			expect(request.value).toEqual(value);
		});
	});

	describe('DeleteRequest', () => {
		test('should create a new instance with a value', () => {
			const value = '123';
			const request = new DeleteRequest(value);
			expect(request.value).toEqual(value);
		});
	});

	describe('GetByIdRequest', () => {
		test('should create a new instance with a value', () => {
			const value = '123';
			const request = new GetByIdRequest(value);
			expect(request.value).toEqual(value);
		});
	});

	describe('GetRequest', () => {
		test('should create a new instance with a value', () => {
			const filters: Filters<Testing> = {
				limit: 10,
				page: 1,
				orderBy: [{ order: 'asc', by: 'name' }],
				filters: { name: 'John' },
			};
			const request = new GetRequest(filters);
			expect(request.value).toEqual(filters);
		});
	});

	describe('InvalidRequest', () => {
		describe('addError', () => {
			test('should add a new error to the errors list', () => {
				const invalidRequest = new InvalidRequest();
				const error: RequestError = {
					parameter: 'name',
					error: 'Name is required',
				};
				invalidRequest.addError(error);
				expect(invalidRequest.errors).toEqual([error]);
			});
		});

		describe('hasErrors', () => {
			test('should return true if there are errors', () => {
				const invalidRequest = new InvalidRequest();
				invalidRequest.addError({
					parameter: 'name',
					error: 'Name is required',
				});
				expect(invalidRequest.hasErrors()).toBe(true);
			});

			test('should return false if there are no errors', () => {
				const invalidRequest = new InvalidRequest();
				expect(invalidRequest.hasErrors()).toBe(false);
			});
		});
	});
});

class BaseRequestImpl extends BaseRequest<Testing> {
	create(item: Testing): InvalidRequest | CreateRequest<Testing> {
		item;
		throw new Error('Method not implemented.');
	}
	update(item: Testing): InvalidRequest | UpdateRequest<Testing> {
		item;
		throw new Error('Method not implemented.');
	}
}

describe('BaseRequest', () => {
	let baseRequestImpl: BaseRequestImpl;
	beforeEach(() => {
		baseRequestImpl = new BaseRequestImpl();
	});
	describe('parseOrderBy', () => {
		test('should return empty list if orderBy is undefined', () => {
			const orderBy = undefined;
			const result = baseRequestImpl.parseOrderBy(
				orderBy as unknown as string
			);
			expect(result).toEqual([]);
		});

		test('should return a list with the parsed values', () => {
			const orderBy = 'name_asc,age_desc';
			const expectedValue: OrderBy[] = [
				{ by: 'name', order: 'asc' },
				{ by: 'age', order: 'desc' },
			];

			const result = baseRequestImpl.parseOrderBy(orderBy);
			expect(result).toEqual(expectedValue);
		});

		test('should not return name', () => {
			const orderBy = 'name_asc_desc,age_desc';
			const expectedValue: OrderBy[] = [{ by: 'age', order: 'desc' }];

			const result = baseRequestImpl.parseOrderBy(orderBy);
			expect(result).toEqual(expectedValue);
		});

		test('should not return age', () => {
			const orderBy = 'name_asc,age_de';
			const expectedValue: OrderBy[] = [{ by: 'name', order: 'asc' }];

			const result = baseRequestImpl.parseOrderBy(orderBy);
			expect(result).toEqual(expectedValue);
		});
	});

	describe('validateEmptyFields', () => {
		test('should add an error to the invalid request if the object has an empty field', () => {
			const invalidRequest = new InvalidRequest();
			const objectWithEmptyField = {
				age: 2,
				id: '1',
				name: '',
			};
			const result = baseRequestImpl.validateEmptyFields(
				objectWithEmptyField,
				invalidRequest
			);
			expect(result.errors.length).toBe(1);
			expect(result.errors[0].error).toBe('name empty');
			expect(result.errors[0].parameter).toBe('name');
		});

		test('should add an error to the invalid request for each empty field in the object', () => {
			const invalidRequest = new InvalidRequest();
			const objectWithEmptyFields = {
				age: 22,
				id: '',
				name: '',
			};
			const result = baseRequestImpl.validateEmptyFields(
				objectWithEmptyFields,
				invalidRequest
			);
			expect(result.errors.length).toBe(2);
			expect(result.errors[0].error).toBe('id empty');
			expect(result.errors[0].parameter).toBe('id');
			expect(result.errors[1].error).toBe('name empty');
			expect(result.errors[1].parameter).toBe('name');
		});

		test('should not add errors to the invalid request for fields in the exceptions list', () => {
			const invalidRequest = new InvalidRequest();
			const objectWithEmptyField = { id: '', name: '', age: 30 };
			const exceptions = ['name'];
			const result = baseRequestImpl.validateEmptyFields(
				objectWithEmptyField,
				invalidRequest,
				exceptions
			);
			expect(result.errors.length).toBe(1);
			expect(result.errors[0].error).toBe('id empty');
			expect(result.errors[0].parameter).toBe('id');
		});

		test('should not add errors to the invalid request for fields that are not strings', () => {
			const invalidRequest = new InvalidRequest();
			const objectWithNonStringField = { name: 'Jose', id: '1', age: 0 };
			const result = baseRequestImpl.validateEmptyFields(
				objectWithNonStringField,
				invalidRequest
			);
			expect(result.errors.length).toBe(0);
		});
	});
	describe('delete', () => {
		test('should return an InvalidRequest object when id is undefined', () => {
			const result = baseRequestImpl.delete(
				undefined as unknown as string
			);

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors.length).toBe(1);
				expect(result.errors[0].error).toBe('id empty');
				expect(result.errors[0].parameter).toBe('id');
			}
		});

		test('should return an InvalidRequest object when id is an empty string', () => {
			const result = baseRequestImpl.delete('');

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors.length).toBe(1);
				expect(result.errors[0].error).toBe('id empty');
				expect(result.errors[0].parameter).toBe('id');
			}
		});

		test('should return a DeleteRequest object when id is valid', () => {
			const id = '123';

			const result = baseRequestImpl.delete(id);
			expect(result).toBeInstanceOf(DeleteRequest);
			if (result instanceof DeleteRequest) {
				expect(result.value).toBe(id);
			}
		});
	});
	describe('get', () => {
		test('should return GetRequest when valid arguments are passed', () => {
			const expectedValue: Filters<Testing> = {
				filters: { id: '1', age: 22 },
				limit: 10,
				page: 1,
				orderBy: [{ by: 'id', order: 'asc' }],
			};
			const result = baseRequestImpl.get(
				{ id: '1', age: 22 },
				10,
				1,
				'id_asc'
			);

			expect(result).toBeInstanceOf(GetRequest);
			if (result instanceof GetRequest) {
				expect(result.value.filters).toEqual(expectedValue.filters);
				expect(result.value.limit).toEqual(expectedValue.limit);
				expect(result.value.page).toEqual(expectedValue.page);
				expect(result.value.orderBy).toEqual(expectedValue.orderBy);
			}
		});

		test('should return GetRequest when valid arguments are passed with multiple filters and orderBy', () => {
			const expectedValue: Filters<Testing> = {
				filters: { name: 'Alice', age: 21 },
				limit: 25,
				page: 2,
				orderBy: [
					{ by: 'name', order: 'desc' },
					{ by: 'age', order: 'asc' },
				],
			};
			const result = baseRequestImpl.get(
				{ name: 'Alice', age: 21 },
				25,
				2,
				'name_desc,age_asc'
			);
			if (result instanceof GetRequest) {
				expect(result).toBeInstanceOf(GetRequest);
				expect(result.value.filters).toEqual(expectedValue.filters);
				expect(result.value.limit).toEqual(expectedValue.limit);
				expect(result.value.page).toEqual(expectedValue.page);
				expect(result.value.orderBy).toEqual(expectedValue.orderBy);
			}
		});

		test('should return InvalidRequest when limit is greater than 100', () => {
			const result = baseRequestImpl.get({}, 150, 1, '');

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toHaveLength(1);
				expect(result.errors[0].error).toEqual(
					'limit out of range, limit has to be more than 0 and less than 1000'
				);
				expect(result.errors[0].parameter).toEqual('limit');
			}
		});

		test('should return InvalidRequest when limit is less than 0', () => {
			const result = baseRequestImpl.get({}, -5, 1, '');

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toHaveLength(1);
				expect(result.errors[0].error).toEqual(
					'limit out of range, limit has to be more than 0 and less than 1000'
				);
				expect(result.errors[0].parameter).toEqual('limit');
			}
		});

		test('should return InvalidRequest when page is less than 0', () => {
			const result = baseRequestImpl.get({}, 10, -2, '');

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors).toHaveLength(1);
				expect(result.errors[0].error).toEqual(
					'page can not be less than 0'
				);
				expect(result.errors[0].parameter).toEqual('page');
			}
		});

		test('should return InvalidRequest when orderBy contains an invalid field', () => {
			const result = baseRequestImpl.get(
				{ id: '1' },
				10,
				1,
				'invalidField_asc'
			);
			if (result instanceof InvalidRequest) {
				expect(result).toBeInstanceOf(InvalidRequest);
				expect(result.errors).toHaveLength(1);
				expect(result.errors[0].error).toEqual(
					'invalidField is not an accepted value'
				);
				expect(result.errors[0].parameter).toEqual('invalidField');
			}
		});
		test('should return a GetRequest with default values when limit and page are undefined', () => {
			const result = baseRequestImpl.get({}, undefined, undefined, '');
			expect(result).toBeInstanceOf(GetRequest);
			if (result instanceof GetRequest) {
				expect(result.value.limit).toEqual(10)
				expect(result.value.page).toEqual(1)
			}
		});
	});
	describe('getById', () => {
		test('should return an InvalidRequest object when id is undefined', () => {
			const result = baseRequestImpl.getById(
				undefined as unknown as string
			);

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors.length).toBe(1);
				expect(result.errors[0].error).toBe('id empty');
				expect(result.errors[0].parameter).toBe('id');
			}
		});

		test('should return an InvalidRequest object when id is an empty string', () => {
			const result = baseRequestImpl.getById('');

			expect(result).toBeInstanceOf(InvalidRequest);
			if (result instanceof InvalidRequest) {
				expect(result.errors.length).toBe(1);
				expect(result.errors[0].error).toBe('id empty');
				expect(result.errors[0].parameter).toBe('id');
			}
		});

		test('should return a GetByIdRequest object when id is valid', () => {
			const id = '123';

			const result = baseRequestImpl.getById(id);
			expect(result).toBeInstanceOf(GetByIdRequest);
			if (result instanceof GetByIdRequest) {
				expect(result.value).toBe(id);
			}
		});
	});
});
