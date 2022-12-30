import { createFilters, Filters, OrderBy } from 'portfolio/repositories';

export class CreateRequest<T> {
	constructor(public value: T) {}
}

export class UpdateRequest<T> {
	constructor(public value: T) {}
}
export class DeleteRequest {
	constructor(public value: string) {}
}
export class GetByIdRequest {
	constructor(public value: string) {}
}
export class GetRequest<T> {
	constructor(public value: Filters<T>) {}
}

interface RequestError {
	parameter: string;
	error: string;
}

export class InvalidRequest {
	constructor(public errors: RequestError[] = []) {}

	addError(error: RequestError): void {
		this.errors.push(error);
	}
	hasErrors(): boolean {
		return this.errors.length > 0;
	}
}

export abstract class BaseRequest<T extends { id: string }> {
	protected parseOrderBy(orderBy: string): OrderBy[] {
		let args: OrderBy[] = [];
		if (orderBy === undefined) {
			return args
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
	protected validateEmptyFields(
		item: T,
		invalidRequest: InvalidRequest,
		exceptions: string[]=[]
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

	abstract create(item: T): CreateRequest<T> | InvalidRequest;
	abstract update(item: T): UpdateRequest<T> | InvalidRequest;

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
	get = (
		filters: Partial<T>,
		limit: number = 10,
		page: number = 1,
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

	getById = (id: string): InvalidRequest | GetByIdRequest => {
		const invaldiRequest = new InvalidRequest();
		if (id === undefined || id.length < 1) {
			invaldiRequest.addError({ error: 'id empty', parameter: 'id' });
		}
		if (invaldiRequest.hasErrors()) {
			return invaldiRequest;
		}
		return new DeleteRequest(id);
	};
}
