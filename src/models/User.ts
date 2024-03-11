import mongoose, { Schema } from 'mongoose';
import { IUserModel } from '../interfaces/user/user.model.interface';

const userSchema: Schema = new Schema<IUserModel>({
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['user', 'admin', 'journalist'], default: 'user' },
	photo: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model<IUserModel>('User', userSchema);
