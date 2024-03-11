import { News } from '../../entities/news.entity';
import { INewsModel } from './news.model.interface';
import { INewsUpdate } from './news.update.interface';

export interface INewsRepository {
	create: (news: News) => Promise<INewsModel | null>;
	find: (id: string) => Promise<INewsModel | null>;
	update: (id: string, data: INewsUpdate) => Promise<INewsModel | null>;
}
