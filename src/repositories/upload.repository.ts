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
}
