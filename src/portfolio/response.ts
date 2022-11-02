
enum ResponseTypes {
	CREATED = 201,
	OK = 200,
	BAD_REQUEST = 400,
	RESOURCE_ERROR = 404,
	SYSTEM_ERROR = 500,
}

export class Response {
	constructor(
		public type: ResponseTypes = ResponseTypes.OK,
		public value: unknown = null
	) {}
}


