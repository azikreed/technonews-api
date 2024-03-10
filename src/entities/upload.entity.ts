export class Upload {
	constructor(private readonly _data: string) {}

	get data(): string {
		return this._data;
	}
}
