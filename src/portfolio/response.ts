export enum ResponseTypes {
	CREATED = 201,
	OK = 200,
	INVALID_CREDENTIALS = 401,
	RESOURCE_ERROR = 404,
	SYSTEM_ERROR = 500,
}

export class ResponseSuccess {
	/**
	 * Representation of a succesful response
	 * @param {ResponseTypes} type - Type of succesful response
	 * @param {unknown} value - Value of the response
	 */
	constructor(
		public type: ResponseTypes = ResponseTypes.OK,
		public value: unknown = null
	) {}
}

export class ResponseFailure {
	value: {
		message: unknown;
	};

	/**
	 * Representation of an invalid response
	 * @param {ResponseTypes} type - Type of invalid response
	 * @param {unknown} value - Value of the response
	 */
	constructor(public type: ResponseTypes, value: unknown) {
		this.value = {
			message: value,
		};
	}
}
