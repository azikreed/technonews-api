import mongoose, { Schema } from 'mongoose';
import { ICategoryModel } from '../interfaces/category/category.model.interface';

const categorySchema: Schema<ICategoryModel> = new Schema<ICategoryModel>({
	name: { type: String, required: true },
	photo: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

export const CategoryModel = mongoose.model<ICategoryModel>('Category', categorySchema);
