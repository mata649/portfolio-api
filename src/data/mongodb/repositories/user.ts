import { createUserEntity, UserEntity } from 'portfolio/entities';
import { UserRepository } from 'portfolio/repositories/user';
import { UserModel } from 'data/mongodb/models';
import { Document } from 'mongoose';

export class UserMongoRepository implements UserRepository {
	private userModel = UserModel;

	private buildUserEntity = (user: Document): UserEntity => {
		return createUserEntity({ ...user.toObject(), id: user.id });
	};
	async create(user: UserEntity): Promise<UserEntity> {
		const newUser = new this.userModel(user);
		await newUser.save();
		return this.buildUserEntity(newUser);
	}
	async getByEmail(email: string): Promise<UserEntity | null> {
		const userFound = await this.userModel.findOne({ email });
		userFound?.email;
		return userFound && this.buildUserEntity(userFound);
	}
	async getById(id: string | undefined): Promise<UserEntity | null> {
		const userFound = await this.userModel.findById(id);
		return userFound && this.buildUserEntity(userFound);
	}
}
