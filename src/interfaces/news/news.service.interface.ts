import { News } from '../../entities/news.entity';
import { IPagination } from '../others/pagination.interface';
import { INewsModel } from './news.model.interface';
import { INewsUpdate } from './news.update.interface';

export interface INewsService {
	create: (news: News) => Promise<INewsModel | null>;
	find: (id: string) => Promise<INewsModel | null>;
	findAll: (pagination: IPagination) => Promise<INewsModel[] | null>;
	update: (id: string, data: INewsUpdate) => Promise<INewsModel | null>;
	delete: (id: string) => Promise<boolean | null>;
	mostViewed: (limit: number) => Promise<INewsModel[] | null>;
	findByCategory: (id: string) => Promise<INewsModel[] | null>;
}
