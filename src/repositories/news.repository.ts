import { injectable } from 'inversify';
import { News } from '../entities/news.entity';
import { INewsModel } from '../interfaces/news/news.model.interface';
import { INewsRepository } from '../interfaces/news/news.repository.interface';
import { NewsModel } from '../models/News';
import { INewsUpdate } from '../interfaces/news/news.update.interface';
import { IPagination } from '../interfaces/others/pagination.interface';

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

	async findAll({ skip = 0, size = 10 }: IPagination): Promise<INewsModel[] | null> {
		return await NewsModel.find().skip(skip).limit(size);
	}

	async update(id: string, data: INewsUpdate): Promise<INewsModel | null> {
		return await NewsModel.findByIdAndUpdate(id, { $set: data }, { new: true });
	}

	async delete(id: string): Promise<boolean | null> {
		return await NewsModel.findByIdAndDelete(id);
	}

	async mostViewed(limit: number): Promise<INewsModel[] | null> {
		return await NewsModel.aggregate([
			{ $match: { views: { $gt: 0 } } },
			{ $sort: { views: -1 } },
			{ $limit: limit },
		]).exec();
	}

	async findByCategory(id: string): Promise<INewsModel[] | null> {
		return await NewsModel.find({ category: id });
	}
}
