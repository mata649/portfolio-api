import { UserEntity } from 'domain/entities';

export interface UserRepository {
	create(user: UserEntity): Promise<UserEntity>;
	getByEmail(email: UserEntity['email']): Promise<UserEntity | null>;
	getById(id: UserEntity['id']): Promise<UserEntity | null>;
}
