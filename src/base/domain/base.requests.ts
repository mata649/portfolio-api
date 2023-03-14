import { createFilters, Filters, OrderBy } from './base.repository';
/**
 * Class representing a valid create request
 * @typeParam T - Type of the value
 */
export class CreateRequest<T> {
	constructor(public value: T) {}
}
/**
 * Class representing a valid update request
 * @typeParam T - Type of the value
 */
export class UpdateRequest<T> {
	constructor(public value: T) {}
}
/**
 * Class representing a delete create request
 */
export class DeleteRequest {
	constructor(public value: string) {}
}
/**
 * Class representing a valid get by id request
 */
export class GetByIdRequest {
	constructor(public value: string) {}
}
/**
 * Class representing a valid get request
 * @typeParam T - Type of the Filters in the value
 */
export class GetRequest<T> {
	constructor(public value: Filters<T>) {}
}
/**
 * Interface representing an error of the request
 */
export interface RequestError {
	/**
	 * Parameter name
	 */
	parameter: string;
	/**
	 * Error message
	 */
	error: string;
}
/**
 *  Class representing an invalid request
 */
export class InvalidRequest {
	/**
	 * List of errors in the invalid request
	 */
	public errors: RequestError[];
	/**
	 * Creates an instance of invalid request and set the errors as an empty list
	 */
	constructor() {
		this.errors = [];
	}
	/**
	 * Adds a new error to the error list
	 * @param error - Error to add
	 */
	addError(error: RequestError): void {
		this.errors.push(error);
	}
	/**
	 * Checks if the invalid request has errors
	 * @returns If the invalid request has errors, returns `true`, else returns `false`
	 */
	hasErrors(): boolean {
		return this.errors.length > 0;
	}
}
/**
 * Abstract class with the base methods required by any request
 * @typeParam T - Type of the object used in the different methods
 */
export abstract class BaseRequest<T extends { id: string }> {
	/**
	 * Parses a string to get a list of `OrderBy` objects, the
	 * string has to follow the format "param1_order1,param2_order2"
	 * @param orderBy - The string to parse
	 * @returns List of `OrderBy` objects
	 *
	 * @example
	 * ```
	 * // Returns [{'name', 'asc'},{'age', 'desc'}]
	 * parseOrderBy('name_asc,age_desc)
	 * ```
	 */
	public parseOrderBy(orderBy: string): OrderBy[] {
		const args: OrderBy[] = [];
		if (orderBy === undefined) {
			return args;
		}
		const params = orderBy.split(',');
		for (const param of params) {
			const arg = param.split('_');
			if (arg.length !== 2) {
				continue;
			}
			if (arg[1] === 'asc' || arg[1] === 'desc')
				args.push({ by: arg[0], order: arg[1] });
		}
		return args;
	}
	/**
	 * Validates if the properties of an element are empty
	 * @param item - Element to validate
	 * @param invalidRequest - Invalid request to add the errors if some property is empty
	 * @param exceptions - List of properties to avoid checking
	 * @returns Returns the invalid request with the errors added if some property is empty
	 */
	public validateEmptyFields(
		item: T,
		invalidRequest: InvalidRequest,
		exceptions: string[] = []
	): InvalidRequest {
		for (const [key, value] of Object.entries(item)) {
			if (exceptions.includes(key)) {
				continue;
			}
			if (typeof value === 'string') {
				if (value.length < 1) {
					invalidRequest.addError({
						error: `${key} empty`,
						parameter: key,
					});
				}
			}
		}
		return invalidRequest;
	}
	/**
	 * Validates if the properties of an element meets the requirements to be created
	 * @param item - Element to be validated
	 * @returns If the element meets the requirements, returns a `CreateRequest` object, else returns an `InvalidRequest` object
	 */
	abstract create(item: T): CreateRequest<T> | InvalidRequest;
	/**
	 * Validates if the properties of an element meets the requirements to be updated
	 * @param item - Element to be validated
	 * @returns If the element meets the requirements, returns a `UpdateRequest` object, else returns an `InvalidRequest` object
	 */
	abstract update(item: T): UpdateRequest<T> | InvalidRequest;
	/**
	 * Validates if an id meets the requirements to delete an element
	 * @param id - id of the element to delete
	 * @returns If the id meets the requirements, returns a `DeleteRequest` object, else returns an `InvalidRequest` object
	 */
	delete = (id: string): InvalidRequest | DeleteRequest => {
		const invaldiRequest = new InvalidRequest();
		if (id === undefined || id.length < 1) {
			invaldiRequest.addError({ error: 'id empty', parameter: 'id' });
		}
		if (invaldiRequest.hasErrors()) {
			return invaldiRequest;
		}
		return new DeleteRequest(id);
	};
	/**
	 * Validates if the filters, limit, page, and orderBy meet the requirements to get a list of elements
	 * @param id - id of the element to delete
	 * @returns If the id meets the requirements, returns a `DeleteRequest` object, else returns an `InvalidRequest` object
	 */
	get = (
		filters: Partial<T>,
		limit = 10,
		page = 1,
		orderBy: string
	): GetRequest<T> | InvalidRequest => {
		const invalidRequest = new InvalidRequest();
		const skillProperties = Object.getOwnPropertyNames(filters);

		if (limit > 100 || limit < 0) {
			invalidRequest.addError({
				parameter: 'limit',
				error: 'limit out of range, limit has to be more than 0 and less than 1000',
			});
		}
		if (page < 0) {
			invalidRequest.addError({
				parameter: 'page',
				error: 'page can not be less than 0',
			});
		}
		const parsedOrderBy = this.parseOrderBy(orderBy);

		for (const order of parsedOrderBy) {
			if (!skillProperties.includes(order.by)) {
				invalidRequest.addError({
					parameter: order.by,
					error: `${order.by} is not an accepted value`,
				});
			}
		}
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new GetRequest(
			createFilters<T>({
				filters: filters,
				limit: limit,
				orderBy: parsedOrderBy,
				page: page,
			})
		);
	};
	/**
	 * Validates if an id meets the requirements to delete an element
	 * @param id - id of the element to delete
	 * @returns If the id meets the requirements, returns a `GetByIdRequest` object, else returns an `InvalidRequest` object
	 */
	getById = (id: string): InvalidRequest | GetByIdRequest => {
		const invaldiRequest = new InvalidRequest();
		if (id === undefined || id.length < 1) {
			invaldiRequest.addError({ error: 'id empty', parameter: 'id' });
		}
		if (invaldiRequest.hasErrors()) {
			return invaldiRequest;
		}
		return new GetByIdRequest(id);
	};
}
