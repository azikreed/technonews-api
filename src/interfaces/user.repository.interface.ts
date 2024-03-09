import { User } from '../entities/user.entity';
import { IUserModel } from './user.model.interface';

export interface IUserRepository {
	create: (user: User) => Promise<IUserModel>;
	find: (email: string) => Promise<IUserModel | null>;
}
