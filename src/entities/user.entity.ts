import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _username: string,
		private readonly _name: string,
		private readonly _email: string,
		private readonly _role: string | undefined,
		private readonly _photo: string | undefined,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get username(): string {
		return this._username;
	}

	get name(): string {
		return this._name;
	}

	get email(): string {
		return this._email;
	}

	get role(): string | undefined {
		return this._role;
	}

	get photo(): string | undefined {
		return this._photo;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async comparePassword(pass: string): Promise<boolean> {
		return compare(pass, this._password);
	}
}
