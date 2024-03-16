import { Category } from '../../entities/category.entity';
import { ICategoryModel } from './category.model.interface';

export interface ICategoryService {
	create: (category: Category) => Promise<ICategoryModel | null>;
	find: () => Promise<ICategoryModel[] | null>;
	delete: (id: string) => Promise<boolean | null>;
	findOne: (id: string) => Promise<ICategoryModel | null>;
}
