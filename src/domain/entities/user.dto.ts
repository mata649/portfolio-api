import { UserEntity } from './user.entity';

export interface CreateUserDto extends Omit<UserEntity, 'id'> {}

export interface LoginUserDto extends Omit<UserEntity, 'id' | 'name'> {}

