import { BaseRepository } from 'portfolio/repositories/baseRepository';
import {
	CreateRequest,
	DeleteRequest,
	GetByIdRequest,
	GetRequest,
	InvalidRequest,
	UpdateRequest,
} from 'portfolio/requests';

import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'portfolio/response';

export class BaseUseCase<
	T extends { id?: string },
	TRepository extends BaseRepository<T>
> {
	constructor(
		protected readonly baseRepository: TRepository,
		protected itemName: string
	) {}

	async create(
		request: CreateRequest<T> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const item = request.value;
		try {
			const itemCreated = await this.baseRepository.create(item);

			return new ResponseSuccess(ResponseTypes.CREATED, itemCreated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async get(
		request: GetRequest<T> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const filters = request.value;
		try {
			const items = await this.baseRepository.get(filters);

			return new ResponseSuccess(ResponseTypes.OK, items);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async getById(
		request: GetByIdRequest | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const id = request.value;
		try {
			const item = await this.baseRepository.getById(id);
			if (item) {
				return new ResponseSuccess(ResponseTypes.OK, item);
			}
			return new ResponseFailure(
				ResponseTypes.RESOURCE_ERROR,
				`${this.itemName} does not exist`
			);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async update(
		request: UpdateRequest<T> | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const item = request.value;
		try {
			const itemFound = await this.baseRepository.getById(item.id);
			if (!itemFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					`${this.itemName} does not exist`
				);
			}
			const itemUpdated = await this.baseRepository.update(item);
			return new ResponseSuccess(ResponseTypes.OK, itemUpdated);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async delete(
		request: DeleteRequest | InvalidRequest
	): Promise<ResponseSuccess | ResponseFailure> {
		if (request instanceof InvalidRequest) {
			return new ResponseFailure(
				ResponseTypes.BAD_REQUEST,
				request.errors
			);
		}
		const id = request.value;
		try {
			const itemFound = await this.baseRepository.getById(id);
			if (!itemFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					`${this.itemName} does not exist`
				);
			}
			const itemDeleted = await this.baseRepository.delete(id);

			return new ResponseSuccess(ResponseTypes.OK, itemDeleted);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system errors'
			);
		}
	}
}
