import mongoose, { Schema } from 'mongoose';
import { IUserModel } from '../interfaces/user.model.interface';

const userSchema = new Schema<IUserModel>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUserModel>('User', userSchema);
