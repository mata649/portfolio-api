import { UserEntity } from "./user.entity";

/**
 * Interface representing the methods needed by any user repository
 */
export interface UserRepository {
	/**
	 * Creates a new user in the repository
	 * @param item - User to be created in the repository
	 * @returns The user created in the repository
	 */
	create(user: UserEntity): Promise<UserEntity>;
	/**
	 * Gets an user by email from the repository
	 * @param email - email of the user to get
	 * @returns If an user was found, returns an user, else returns a null
	 */
	getByEmail(email: UserEntity['email']): Promise<UserEntity | null>;
	/**
	 * Gets an user by id from the repository
	 * @param id - identifier of the user to get
	 * @returns If an user was found, returns an user, else returns a null
	 */
	getById(id: UserEntity['id']): Promise<UserEntity | null>;
}
