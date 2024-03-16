import { inject, injectable } from 'inversify';
import { Category } from '../entities/category.entity';
import { ICategoryModel } from '../interfaces/category/category.model.interface';
import { ICategoryService } from '../interfaces/category/category.service.interface';
import { TYPES } from '../types';
import { ICategoryRepository } from '../interfaces/category/category.repository.interface';

@injectable()
export class CategoryService implements ICategoryService {
	constructor(@inject(TYPES.CategoryRepository) private categoryRepository: ICategoryRepository) {}

	async create(category: Category): Promise<ICategoryModel | null> {
		return await this.categoryRepository.create(category);
	}

	async delete(id: string): Promise<boolean | null> {
		return await this.categoryRepository.delete(id);
	}

	async find(): Promise<ICategoryModel[] | null> {
		return await this.categoryRepository.find();
	}

	async findOne(id: string): Promise<ICategoryModel | null> {
		return await this.categoryRepository.findOne(id);
	}
}
