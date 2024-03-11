import { Upload } from '../../entities/upload.entity';
import { IUploadModel } from './upload.model.interface';

export interface IUploadRepository {
	create: (upload: Upload) => Promise<IUploadModel | null>;
	find: (id: string) => Promise<IUploadModel | null>;
	findAll: () => Promise<IUploadModel[] | null>;
	delete: (id: string) => Promise<boolean>;
}
