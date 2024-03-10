import mongoose, { Schema } from 'mongoose';
import { IUploadModel } from '../interfaces/upload.model.interface';

const uploadSchema = new Schema<IUploadModel>({
	data: { type: String, unique: true, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UploadModel = mongoose.model<IUploadModel>('Upload', uploadSchema);
