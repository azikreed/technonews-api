import { FilterQuery } from 'mongoose';
import { Category } from '../../entities/category.entity';
import { ICategoryModel } from './category.model.interface';

export interface ICategoryRepository {
	create: (category: Category) => Promise<ICategoryModel | null>;
	find: () => Promise<ICategoryModel[] | null>;
	delete: (id: string) => Promise<boolean | null>;
}
