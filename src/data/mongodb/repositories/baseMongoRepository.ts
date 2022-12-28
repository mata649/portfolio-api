import {
	BaseRepository,
	Filters,
	Results,
} from 'portfolio/repositories/baseRepository';
import { Model, Document, HydratedDocument, SortOrder, Types } from 'mongoose';

export class baseMongoRepository<T extends { id: string }>
	implements BaseRepository<T>
{
	constructor(
		protected readonly model: Model<any>,
		protected createGenericEntity: (item: Partial<T>) => T
	) {}

	protected createItemEntity(
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
	protected parseFilters(filters: Partial<T>): Partial<T> {
		for (const key in filters) {
			if (filters[key] === '' || filters[key] === null) {
				delete filters[key];
			}
		}
		return filters;
	}

	protected parseOrderBy(orderBy: Filters<T>['orderBy']) {
		let args: [string, SortOrder][] = [];
		if (orderBy.includes(',')) {
			const params = orderBy.split(',');
			for (const param of params) {
				const arg = param.split('_');
				if (arg.length === 2) {
					args.push([arg[0], arg[1] === 'desc' ? -1 : 1]);
				}
			}
			return args;
		}
		const arg = orderBy.split('_');
		if (arg.length === 2) {
			args.push([arg[0], arg[1] === 'desc' ? -1 : 1]);
		}
		return args;
	}
	async create(item: T): Promise<T> {
		const itemCreated = new this.model(item);
		await itemCreated.save();
		return this.createItemEntity(itemCreated);
	}
	async get(filters: Filters<T>): Promise<Results<T> | null> {
		filters.filters = this.parseFilters(filters.filters);
		const orderBy = this.parseOrderBy(filters.orderBy);

		const itemsFound = await this.model
			.find(filters.filters)
			.sort(orderBy)
			.collation({ locale: 'en', caseLevel: true })
			.limit(filters.limit * 1)
			.skip((filters.page - 1) * filters.limit);

		const count = await this.model.find(filters.filters).countDocuments();
		return {
			data: itemsFound.map((item) => this.createItemEntity(item)),
			currentPage: filters.page,
			totalPages: Math.ceil(count / filters.limit),
		};
	}
	async getById(id: T['id']): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			return null;
		}
		const userFound = await this.model.findById(id);
		return userFound && this.createItemEntity(userFound);
	}
	async delete(id: string): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			return null;
		}
		const itemDeleted = await this.model.findByIdAndDelete(id);
		return this.createItemEntity(itemDeleted);
	}
	async update(item: T): Promise<T> {
		const itemUpdated = await this.model.findByIdAndUpdate(item.id, item, {
			new: true,
		});
		return this.createItemEntity(itemUpdated);
	}
}
