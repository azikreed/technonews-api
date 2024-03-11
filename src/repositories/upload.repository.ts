import { injectable } from 'inversify';
import { Upload } from '../entities/upload.entity';
import { IUploadModel } from '../interfaces/upload/upload.model.interface';
import { IUploadRepository } from '../interfaces/upload/upload.repository.interface';
import { UploadModel } from '../models/Upload';

@injectable()
export class UploadRepository implements IUploadRepository {
	constructor() {}

	async create({ data }: Upload): Promise<IUploadModel> {
		const upload = new UploadModel({ data });
		return await upload.save();
	}

	async delete(id: string): Promise<boolean> {
		const { deletedCount } = await UploadModel.deleteOne({ _id: id });
		return Boolean(deletedCount);
	}

	async find(id: string): Promise<IUploadModel | null> {
		const upload = await UploadModel.findOne({ _id: id });
		return upload;
	}
}
