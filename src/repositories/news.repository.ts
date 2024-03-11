import { injectable } from 'inversify';
import { News } from '../entities/news.entity';
import { INewsModel } from '../interfaces/news/news.model.interface';
import { INewsRepository } from '../interfaces/news/news.repository.interface';
import { NewsModel } from '../models/News';
import { INewsUpdate } from '../interfaces/news/news.update.interface';

@injectable()
export class NewsRepository implements INewsRepository {
	constructor() {}

	async create(news: News): Promise<INewsModel | null> {
		const createdNews = new NewsModel(news);
		return createdNews.save();
	}

	async find(id: string): Promise<INewsModel | null> {
		return await NewsModel.findOne({ _id: id });
	}

	async findAll(): Promise<INewsModel[] | null> {
		return await NewsModel.find();
	}

	async update(id: string, data: INewsUpdate): Promise<INewsModel | null> {
		return await NewsModel.findByIdAndUpdate(id, data, { new: true });
	}
}
