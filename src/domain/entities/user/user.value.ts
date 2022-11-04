import { UserEntity } from './user.entity';

interface UserValueParams extends Partial<UserEntity> {}

export class UserValue implements UserEntity {
	id: string;
	name: string;
	email: string;
	password: string;

	constructor({ id, name, email, password }: UserValueParams) {
		this.id = id ?? '';
		this.name = name ?? '';
		this.email = email ?? '';
		this.password = password ?? '';
	}
}
