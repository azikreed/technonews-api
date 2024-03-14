import { Category } from '../../entities/category.entity';
import { ICategoryModel } from './category.model.interface';

export interface ICategoryRepository {
	create: (category: Category) => Promise<ICategoryModel | null>;
}
