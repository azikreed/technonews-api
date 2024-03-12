import { inject, injectable } from 'inversify';
import { IUserModel } from '../interfaces/user/user.model.interface';
import { IUserService } from '../interfaces/user/user.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { TYPES } from '../types';
import { IUserRepository } from '../interfaces/user/user.repository.interface';
import { IConfigService } from '../interfaces/helpers/config.interface';
import { User } from '../entities/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	async createUser({
		username,
		name,
		email,
		password,
		photo,
	}: UserRegisterDto): Promise<IUserModel | null> {
		const newUser = new User(username, name, email, password, photo);
		const salt = Number(this.configService.get('SALT'));
		await newUser.setPassword(password, salt);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.userRepository.create(newUser);
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}

	async getUser(email: string): Promise<IUserModel | null> {
		return await this.userRepository.find(email);
	}
}
