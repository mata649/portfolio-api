import { UserEntity } from '../entities/user';

export interface UserRepository {
	createUser(user: UserEntity): Promise<UserEntity>;
	getUserByEmail(email: UserEntity['email']): Promise<UserEntity | null>;
	getUserById(id: UserEntity['id']): Promise<UserEntity | null>;
}
