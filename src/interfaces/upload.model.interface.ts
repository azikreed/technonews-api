import { Document } from 'mongoose';

export interface IUploadModel extends Document {
	data: string;
	createdAt: Date;
	updatedAt: Date;
}
