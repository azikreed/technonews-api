import { inject, injectable } from 'inversify';
import { IUploadService } from '../interfaces/upload.service.interface';
import { TYPES } from '../types';
import { IUploadRepository } from '../interfaces/upload.repository.interface';
import { Readable } from 'stream';
import { IUploadModel } from '../interfaces/upload.model.interface';
import { IMinioService } from '../interfaces/minio.service.interface';
import { Upload } from '../entities/upload.entity';

@injectable()
export class UploadService implements IUploadService {
	constructor(
		@inject(TYPES.UploadRepository) private uploadRepository: IUploadRepository,
		@inject(TYPES.MinioService) private minioService: IMinioService,
	) {}

	async create(
		bucketName: string,
		fileOriginName: string,
		fileBufferData: string | Buffer | Readable,
	): Promise<IUploadModel> {
		const convertedName = Date.now() + '-' + fileOriginName.replace(/\s+/g, '-').toLowerCase();
		await this.minioService.uploadFile(bucketName, fileOriginName, fileBufferData);
		const upload = new Upload(convertedName);
		return this.uploadRepository.create(upload);
	}
}
