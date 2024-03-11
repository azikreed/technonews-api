import { inject, injectable } from 'inversify';
import { IUploadService } from '../interfaces/upload/upload.service.interface';
import { TYPES } from '../types';
import { IUploadRepository } from '../interfaces/upload/upload.repository.interface';
import { Readable } from 'stream';
import { IUploadModel } from '../interfaces/upload/upload.model.interface';
import { IMinioService } from '../interfaces/others/minio.service.interface';
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
	): Promise<IUploadModel | null> {
		const convertedName = Date.now() + '-' + fileOriginName.replace(/\s+/g, '-').toLowerCase();
		await this.minioService.uploadFile(bucketName, convertedName, fileBufferData);
		const upload = new Upload(convertedName);
		return this.uploadRepository.create(upload);
	}

	async delete(bucketName: string, fileOriginName: string, id: string): Promise<boolean> {
		const convertedName = Date.now() + '-' + fileOriginName.replace(/\s+/g, '-').toLowerCase();
		await this.minioService.deleteFile(bucketName, convertedName);
		return await this.uploadRepository.delete(id);
	}

	async find(id: string): Promise<IUploadModel | null> {
		return await this.uploadRepository.find(id);
	}
}
