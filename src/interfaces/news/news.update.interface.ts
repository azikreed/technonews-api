import { INewsDescription } from './news.model.interface';

export interface INewsUpdate {
	title?: string;
	description?: INewsDescription[];
	photo?: string[] | string;
	tags?: string[];
	views?: number;
	uniqueViews?: string[];
	updatedAt: Date;
}
