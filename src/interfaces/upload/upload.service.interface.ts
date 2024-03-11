import { Readable } from 'stream';
import { IUploadModel } from './upload.model.interface';

export interface IUploadService {
	create: (
		bucketName: string,
		fileOriginName: string,
		fileBufferData: string | Buffer | Readable,
	) => Promise<IUploadModel | null>;
	find: (id: string) => Promise<IUploadModel | null>;
	findAll: () => Promise<IUploadModel[] | null>;
	delete: (bucketName: string, fileOriginName: string, id: string) => Promise<boolean>;
}
