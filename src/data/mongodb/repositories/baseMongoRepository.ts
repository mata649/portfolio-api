import { Model, Document, HydratedDocument } from 'mongoose';

export class baseMongoRepository<T extends { id?: string }> {
	constructor(
		private readonly model: Model<T>,
		private createGenericEntity: (item: Partial<T>) => T
	) {}

	private createItemEntity(
		item:
			| (Document<unknown, any, T> & T)
			| HydratedDocument<T, {}, {}>
			| null
	): T {
		if (item) {
			return this.createGenericEntity({
				...item.toObject(),
				id: item.id,
			});
		}
		return this.createGenericEntity({});
	}
	async create(item: T): Promise<T> {
		const itemCreated = new this.model(item);
		await itemCreated.save();
		return this.createItemEntity(itemCreated);
	}
	async get(): Promise<T[] | null> {
		const itemsFound = await this.model.find();
		return itemsFound.map((item) => this.createItemEntity(item));
	}
	async getById(id: T['id']): Promise<T | null> {
		const userFound = await this.model.findById(id);
		return userFound && this.createItemEntity(userFound);
	}
	async delete(id: string): Promise<T | null> {
		const itemDeleted = await this.model.findByIdAndDelete(id);
		return this.createItemEntity(itemDeleted);
	}
	async update(item: T): Promise<T | null> {
		const itemUpdated = await this.model.findByIdAndUpdate(item.id, item);
		return this.createItemEntity(itemUpdated);
	}
}
