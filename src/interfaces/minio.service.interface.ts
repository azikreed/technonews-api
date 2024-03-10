import { UploadedObjectInfo } from 'minio';
import { Readable } from 'stream';

export interface IMinioService {
	connect: () => Promise<void>;
	uploadFile: (
		bucketName: string,
		fileOriginName: string,
		fileBufferData: string | Buffer | Readable,
	) => Promise<UploadedObjectInfo>;
	deleteFile: (bucketName: string, fileOriginName: string) => Promise<void>;
}
