import { Upload } from '../entities/upload.entity';
import { IUploadModel } from './upload.model.interface';

export interface IUploadRepository {
	create: (upload: Upload) => Promise<IUploadModel>;
}
