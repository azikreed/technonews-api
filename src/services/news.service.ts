import { inject, injectable } from 'inversify';
import { INewsModel } from '../interfaces/news/news.model.interface';
import { INewsService } from '../interfaces/news/news.service.interface';
import { NewsCreateDto } from './dto/news.dto';
import { TYPES } from '../types';
import { INewsRepository } from '../interfaces/news/news.repository.interface';
import { plainToClass } from 'class-transformer';
import { News } from '../entities/news.entity';
import { INewsUpdate } from '../interfaces/news/news.update.interface';
import { IPagination } from '../interfaces/others/pagination.interface';

@injectable()
export class NewsService implements INewsService {
	constructor(@inject(TYPES.NewsRepository) private newsRepository: INewsRepository) {}

	async create(news: News): Promise<INewsModel | null> {
		const createdNews = await this.newsRepository.create(news);
		return createdNews;
	}

	async find(id: string): Promise<INewsModel | null> {
		return await this.newsRepository.find(id);
	}

	async update(id: string, data: INewsUpdate): Promise<INewsModel | null> {
		return await this.newsRepository.update(id, data);
	}

	async findAll({ skip, size }: IPagination): Promise<INewsModel[] | null> {
		return await this.newsRepository.findAll({ skip, size });
	}

	async delete(id: string): Promise<boolean | null> {
		return await this.newsRepository.delete(id);
	}

	async mostViewed(limit: number): Promise<INewsModel[] | null> {
		return await this.newsRepository.mostViewed(limit);
	}

	async findByCategory(id: string): Promise<INewsModel[] | null> {
		return await this.newsRepository.findByCategory(id);
	}
}
