import { UserLoginDto } from '../services/dto/user-login.dto';
import { UserRegisterDto } from '../services/dto/user-register.dto';
import { IUserModel } from './user.model.interface';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<IUserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	getUserInfo: (email: string) => Promise<IUserModel | null>;
}
