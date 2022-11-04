import { UserEntity } from './userEntity';

export interface CreateUserDto extends Omit<UserEntity, 'id'> {}

export interface LoginUserDto extends Omit<UserEntity, 'id' | 'name'> {}

