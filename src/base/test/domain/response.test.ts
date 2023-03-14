import {
	ResponseSuccess,
	ResponseFailure,
	ResponseTypes,
} from '@/base/domain/response';

describe('ResponseSuccess', () => {
	test('should create a new instance of ResponseSuccess with default values', () => {
		const response = new ResponseSuccess();
		expect(response.type).toBe(ResponseTypes.OK);
		expect(response.value).toBeNull();
	});

	test('should create a new instance of ResponseSuccess with custom values', () => {
		const response = new ResponseSuccess(ResponseTypes.CREATED, {
			id: '123',
			name: 'John',
		});
		expect(response.type).toBe(ResponseTypes.CREATED);
		expect(response.value).toEqual({ id: '123', name: 'John' });
	});
});

describe('ResponseFailure', () => {
	test('should create a new instance of ResponseFailure', () => {
		const response = new ResponseFailure(ResponseTypes.BAD_REQUEST, {
			error: 'Invalid input',
		});
		expect(response.type).toBe(ResponseTypes.BAD_REQUEST);
		expect(response.value).toEqual({ message: { error: 'Invalid input' } });
	});
});
