import { Schema, model } from 'mongoose';
import { UserEntity } from '../../domain/entities/user';

const UserSchema = new Schema<UserEntity>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});
export const UserModel = model<UserEntity>('User', UserSchema);
