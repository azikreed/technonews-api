import { Document, Schema } from 'mongoose';

export interface INewsDescription {
	title: string;
	text: string;
}

export interface INewsModel extends Document {
	title: string;
	description: INewsDescription[];
	photo: string[] | string;
	tags: string[];
	views: number;
	uniqueViews: string[];
	category: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
