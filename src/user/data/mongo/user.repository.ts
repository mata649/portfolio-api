import { createUserEntity, UserEntity, UserRepository } from '@/user/domain';
import { Document } from 'mongoose';
import { UserModel } from './user.model';
/**
 *Repository for interacting with User entities in MongoDB
 */
export class UserMongoRepository implements UserRepository {
	private userModel = UserModel;

	/**
	 *Convert a MongoDB document to a UserEntity object
	 *@param user - the user document to convert
	 *@returns the UserEntity object
	 */
	private buildUserEntity = (user: Document): UserEntity => {
		return createUserEntity({ ...user.toObject(), id: user.id });
	};
	/**
	 *Create a new user in the database
	 *@param user - the user to create
	 *@returns the created user
	 */
	async create(user: UserEntity): Promise<UserEntity> {
		const newUser = new this.userModel(user);
		await newUser.save();
		return this.buildUserEntity(newUser);
	}
	/**
	 *Get a user by its email address
	 *@param email - the user's email address
	 *@returns the user with the matching email, or null if no such user exists
	 */
	async getByEmail(email: string): Promise<UserEntity | null> {
		const userFound = await this.userModel.findOne({ email });
		userFound?.email;
		return userFound && this.buildUserEntity(userFound);
	}
	/**
	 *Get a user by its ID
	 *@param id - the user's ID
	 *@returns the user with the matching ID, or null if no such user exists
	 */
	async getById(id: string | undefined): Promise<UserEntity | null> {
		const userFound = await this.userModel.findById(id);
		return userFound && this.buildUserEntity(userFound);
	}
}
