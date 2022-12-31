/** Interface representing an user in the portfolio */
export interface UserEntity {
	/** Unique user's identifier*/
	id: string;
	/** User's name*/
	name: string;
	/** Unique user's email*/
	email: string;
	/** User's password*/
	password: string;
}

/**
 * Returns a new `UserEntity`, setting proper values to
 * the undefined values
 * @param item - The object to create the new `UserEntity`
 * @returns The new `UserEntity`
 *
 */
export const createUserEntity = ({
	id = '',
	name = '',
	email = '',
	password = '',
}: Partial<UserEntity>): UserEntity => {
	return {
		id,
		name,
		email,
		password,
	};
};
