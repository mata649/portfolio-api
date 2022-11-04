import { UserEntity } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserModel } from '../models';

export class UserMongoRepository implements UserRepository {
	private userModel = UserModel;

	private createUserEntity = (user: UserEntity): UserEntity => {
		return {
			email: user.email,
			name: user.name,
			id: user.id,
			password: user.password,
		};
	};
	async createUser(user: UserEntity): Promise<UserEntity> {
		const newUser = new this.userModel(user);
		await newUser.save();
		return this.createUserEntity(newUser);
	}
	async getUserByEmail(email: string): Promise<UserEntity | null> {
		const userFound = await this.userModel.findOne({ email });
		userFound?.email;
		return userFound && this.createUserEntity(userFound);
	}
	async getUserById(id: string | undefined): Promise<UserEntity | null> {
		const userFound = await this.userModel.findById(id);
		return userFound && this.createUserEntity(userFound);
	}
}
