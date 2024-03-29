import { injectable } from 'inversify';
import { IUserRepository } from '../interfaces/user/user.repository.interface';
import { User } from '../entities/user.entity';
import { IUserModel } from '../interfaces/user/user.model.interface';
import { UserModel } from '../models/User';

@injectable()
export class UserRepository implements IUserRepository {
	constructor() {}

	async create({ username, name, email, role, password, photo }: User): Promise<IUserModel> {
		const user = new UserModel({
			username,
			name,
			email,
			role,
			password,
			photo,
		});
		return await user.save();
	}

	async find(email: string): Promise<IUserModel | null> {
		return await UserModel.findOne({ email: email });
	}
}
