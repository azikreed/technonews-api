import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { ILogger } from '../interfaces/logger.interface';
import { TYPES } from '../types';
import { IConfigService } from '../interfaces/config.interface';

@injectable()
export class MongoService {
	constructor(
		@inject(TYPES.LoggerService) private logger: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {}

	async connect(): Promise<void> {
		try {
			const url = this.configService.get('MONGO_URI');
			await mongoose.connect(url);
			this.logger.log('[MongoService] Успешно подключились к базе данных');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[MongoService] Ошибка подключения к базе данных: ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await mongoose.disconnect();
	}
}
