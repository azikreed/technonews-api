import { Category } from '../../entities/category.entity';
import { ICategoryModel } from './category.model.interface';

export interface ICategoryService {
	create: (category: Category) => Promise<ICategoryModel | null>;
}
