import { createUserEntity } from 'portfolio/entities';

describe('createUserEntity', () => {
	it('creates a UserEntity object with default values if no parameters are provided', () => {
		const result = createUserEntity({});

		expect(result).toEqual({
			id: '',
			name: '',
			email: '',
			password: '',
		});
	});

	it('creates a UserEntity object with the provided values', () => {
		const result = createUserEntity({
			id: '1',
			name: 'John Doe',
			email: 'john.doe@testing.com',
			password: '12345678',
		});

		expect(result).toEqual({
			id: '1',
			name: 'John Doe',
			email: 'john.doe@testing.com',
			password: '12345678',
		});
	});
});
