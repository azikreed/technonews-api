import { injectable } from 'inversify';
import { Category } from '../entities/category.entity';
import { ICategoryModel } from '../interfaces/category/category.model.interface';
import { ICategoryRepository } from '../interfaces/category/category.repository.interface';
import { CategoryModel } from '../models/Category';

@injectable()
export class CategoryRepository implements ICategoryRepository {
	constructor() {}

	async create({ name, photo }: Category): Promise<ICategoryModel | null> {
		const category = new CategoryModel({ name, photo });
		return category.save();
	}
}
