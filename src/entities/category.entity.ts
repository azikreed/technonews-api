export class Category {
	constructor(
		private readonly _name: string,
		private readonly _photo?: string,
	) {}

	get name(): string {
		return this._name;
	}

	get photo(): string | undefined {
		return this._photo;
	}
}
