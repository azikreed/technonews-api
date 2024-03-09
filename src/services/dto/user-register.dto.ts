import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Не указан username' })
	username: string;
	@IsString({ message: 'Не указано имя' })
	name: string;
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;
	@IsString({ message: 'Не указан пароль' })
	password: string;
	@IsString({ message: 'Не указан пароль' })
	photo: string | undefined;
}
