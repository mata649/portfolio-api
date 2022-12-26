interface RequestError {
	parameter: string;
	error: string;
}

export class InvalidRequest {
	constructor(public errors: RequestError[]=[]) {}

	addError(error: RequestError): void {
		this.errors.push(error);
	}
	hasErrors(): boolean {
		return this.errors.length > 0;
	}
}
