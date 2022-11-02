interface RequestError {
	parameter: string;
	message: string;
}
class InvalidRequest {
	constructor(public errors: RequestError[] = []) {}

	addError(
		parameter: RequestError['parameter'],
		message: RequestError['message']
	) {
		this.errors.push({
			parameter,
			message,
		});
	}

	get hasErrors(): boolean {
		return this.errors.length > 0;
	}
}
