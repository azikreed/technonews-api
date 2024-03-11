import { INewsDescription } from '../interfaces/news/news.model.interface';

export class News {
	constructor(
		private readonly _title: string,
		private readonly _description: INewsDescription[],
		private readonly _photo: string[] | string,
		private readonly _tags: string[],
		private readonly _views: number,
	) {}

	get title(): string {
		return this._title;
	}

	get description(): object[] {
		return this._description;
	}

	get tags(): string[] {
		return this._tags;
	}

	get views(): number {
		return this._views;
	}

	get photo(): string | string[] {
		return this._photo;
	}
}
