import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { INewsDescription } from '../../interfaces/news/news.model.interface';

export class NewsDescriptionDto implements INewsDescription {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	text: string;
}

export class NewsCreateDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsArray()
	description: NewsDescriptionDto[];

	@IsArray()
	@IsString({ each: true })
	photo: string[] | string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	views: number;
}
