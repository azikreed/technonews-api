import mongoose, { Schema } from 'mongoose';
import { INewsModel } from '../interfaces/news/news.model.interface';

const newsSchema: Schema = new Schema<INewsModel>({
	title: { type: String, required: true },
	description: [
		{
			title: { type: String, required: true },
			text: { type: String, required: true },
		},
	],
	photo: { type: Schema.Types.Mixed, required: true },
	tags: { type: [String], required: true },
	views: { type: Number, default: 0 },
	uniqueViews: { type: [String], default: [] },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const NewsModel = mongoose.model<INewsModel>('News', newsSchema);
