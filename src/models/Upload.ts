import mongoose, { Schema } from 'mongoose';
import { IUploadModel } from '../interfaces/upload/upload.model.interface';

const uploadSchema: Schema = new Schema<IUploadModel>({
	data: { type: String, unique: true, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const UploadModel = mongoose.model<IUploadModel>('Upload', uploadSchema);
