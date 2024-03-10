import { inject, injectable } from 'inversify';
import { Client, UploadedObjectInfo } from 'minio';
import { TYPES } from '../types';
import { ILogger } from '../interfaces/logger.interface';
import { IConfigService } from '../interfaces/config.interface';
import { Readable } from 'stream';
import { IMinioService } from '../interfaces/minio.service.interface';

@injectable()
export class MinioService implements IMinioService {
	client: Client;

	constructor(
		@inject(TYPES.LoggerService) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		this.client = new Client({
			endPoint: this.configService.get('MINIO_ENDPOINT'),
			port: Number(this.configService.get('MINIO_PORT')),
			useSSL: Boolean(Number(this.configService.get('MINIO_USESSL'))),
			accessKey: this.configService.get('MINIO_ACCESS'),
			secretKey: this.configService.get('MINIO_SECRET'),
		});
	}

	async connect(): Promise<void> {
		const bucketName = this.configService.get('BUCKET_NAME');
		const result = await this.client.bucketExists(bucketName);
		// this.client.setBucketPolicy(bucketName, )
		if (result) {
			return this.loggerService.log(`[MinioService] Minio bucket with name ${bucketName} exists`);
		}
		await this.client.makeBucket(bucketName);
		this.loggerService.log(`[MinioService] Minio bucket with name ${bucketName} created`);
	}

	async uploadFile(
		bucketName: string,
		fileOriginName: string,
		fileBufferData: string | Buffer | Readable,
	): Promise<UploadedObjectInfo> {
		return new Promise((resolve, reject) => {
			this.client.putObject(bucketName, fileOriginName, fileBufferData, (err, data) => {
				if (err) return reject(err);
				return resolve(data);
			});
		});
	}

	async deleteFile(bucketName: string, fileOriginName: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.client
				.removeObject(bucketName, fileOriginName)
				.then((data) => {
					return resolve(data);
				})
				.catch((err) => {
					return reject(err);
				});
		});
	}
}
