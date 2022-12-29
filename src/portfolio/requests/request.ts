export class CreateRequest<T> {
	constructor(public value: T) {}
}

export class UpdateRequest<T> {
	constructor(public value: T) {}
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

export interface BaseRequest<T> {
	create: (item: T) => CreateRequest<T> | InvalidRequest;
}
