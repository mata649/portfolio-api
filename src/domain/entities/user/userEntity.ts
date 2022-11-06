export interface UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;
}

export const createUserEntity = ({
	id,
	name,
	email,
	password,
}: Partial<UserEntity>): UserEntity => {
	return {
		id: id ?? '',
		name: name ?? '',
		email: email ?? '',
		password: password ?? '',
	};
};
