import { injectable } from 'inversify';
import { Category } from '../entities/category.entity';
import { ICategoryModel } from '../interfaces/category/category.model.interface';
import { ICategoryRepository } from '../interfaces/category/category.repository.interface';
import { CategoryModel } from '../models/Category';
import { FilterQuery } from 'mongoose';

@injectable()
export class CategoryRepository implements ICategoryRepository {
	constructor() {}

	async create({ name, photo }: Category): Promise<ICategoryModel | null> {
		const category = new CategoryModel({ name, photo });
		return category.save();
	}

	async delete(id: string): Promise<boolean | null> {
		return await CategoryModel.findOneAndDelete({ _id: id });
	}

	async find(): Promise<ICategoryModel[] | null> {
		return await CategoryModel.find();
	}

	async findOne(id: string): Promise<ICategoryModel | null> {
		return await CategoryModel.findById(id);
	}
}
