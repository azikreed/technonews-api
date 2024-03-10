import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { TYPES } from '../../types';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../interfaces/helpers/logger.interface';
import { IConfigService } from '../../interfaces/helpers/config.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	constructor(@inject(TYPES.LoggerService) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] Не удалось прочитать файл. .env или он отсутствует');
		} else {
			this.logger.log('[ConfigService] Конфигурация .env загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
