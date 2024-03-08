import { Document } from 'mongoose';

export interface IUserModel extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	role: string;
	photo: string;
	createdAt: Date;
	updatedAt: Date;
}
