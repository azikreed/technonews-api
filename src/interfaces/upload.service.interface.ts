import { Readable } from 'stream';
import { IUploadModel } from './upload.model.interface';

export interface IUploadService {
	create: (
		bucketName: string,
		fileOriginName: string,
		fileBufferData: string | Buffer | Readable,
	) => Promise<IUploadModel>;
}
