import {
	BaseRepository,
	Filters,
	Results,
} from 'portfolio/repositories/baseRepository';
import { Model, Document, HydratedDocument, SortOrder, Types } from 'mongoose';
/**
 *Provides basic CRUD functionality for a mongo repository of items.
 *@typeParam T - Type of object used in the methods
 *@extends BaseRepository<T> - For get the basic methods that a repository needs
 */
export class baseMongoRepository<T extends { id: string }>
	implements BaseRepository<T>
{
	/**
	 *Initializes the repository with a Mongoose model and a function to create new entities.
	 *@param {Model<any>} model - Mongoose model used to perform database operations
	 *@param {(item: Partial<T>) => T} createGenericEntity - Function that creates a new entity from a partial item
	 */
	constructor(
		protected readonly model: Model<any>,
		protected createGenericEntity: (item: Partial<T>) => T
	) {}
	/**
	 *Creates a new entity from a Mongoose document.
	 *@param item - Mongoose document
	 *@returns The new entity
	 */
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
	/**
	 *Removes empty filters from the filters object.
	 *@param filters - Filters to parse
	 *@returns Filters with empty values removed
	 */
	protected parseFilters(filters: Partial<T>): Partial<T> {
		for (const key in filters) {
			if (filters[key] === '' || filters[key] === null) {
				delete filters[key];
			}
		}
		return filters;
	}
	/**
	 *Converts the orderBy array of objects into an array of tuples.
	 *@param orderBy - OrderBy array of objects
	 *@returns Array of tuples
	 */
	protected parseOrderBy(orderBy: Filters<T>['orderBy']) {
		const args: [string, SortOrder][] = [];
		for (const order of orderBy) {
			args.push([order.by, order.order === 'asc' ? 1 : -1]);
		}
		return args;
	}
	/**
	 *Creates a new item in the repository.
	 *@param item - Item to create
	 *@returns Created item
	 */
	async create(item: T): Promise<T> {
		const itemCreated = new this.model(item);
		await itemCreated.save();
		return this.createItemEntity(itemCreated);
	}
	/**
	 *Retrieves a list of items from the repository based on the given filters
	 *@param filters - Object with filters to search the items in the repository
	 *@returns Object with the list of items found and the total pages and current page of the list
	 */
	async get(filters: Filters<T>): Promise<Results<T>> {
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
	/**
	 *Retrieves an item from the repository by its id
	 *@param id - The id of the item to be retrieved
	 *@returns The item with the specified id or null if the item could not be found or the id is not valid
	 */
	async getById(id: T['id']): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			return null;
		}
		const userFound = await this.model.findById(id);
		return userFound && this.createItemEntity(userFound);
	}
	/**
	 *Deletes an item from the repository by its id
	 *@param id - The id of the item to delete
	 *@returns The deleted item, or null if it couldn't be found
	 */
	async delete(id: string): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			return null;
		}
		const itemDeleted = await this.model.findByIdAndDelete(id);
		return this.createItemEntity(itemDeleted);
	}
	/**
	 *Updates an item in the repository
	 *@param item - Item with the updated information
	 *@returns The updated item
	 */
	async update(item: T): Promise<T> {
		const itemUpdated = await this.model.findByIdAndUpdate(item.id, item, {
			new: true,
		});
		return this.createItemEntity(itemUpdated);
	}
}
