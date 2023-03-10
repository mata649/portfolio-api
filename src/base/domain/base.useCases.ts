import { BaseRepository } from './base.repository';
import {
	CreateRequest,
	DeleteRequest,
	GetByIdRequest,
	GetRequest,
	InvalidRequest,
	UpdateRequest,
} from './base.requests';

import { ResponseFailure, ResponseSuccess, ResponseTypes } from '@/base/domain/response';
/**
 * Provides basic CRUD functionality for a repository of items of type T.
 * @typeParam T - An item type with an id field.
 * @typeParam TRepository - A repository of items of type T.
 */
export class BaseUseCase<
	T extends { id?: string },
	TRepository extends BaseRepository<T>
> {
	/**
	 * Constructs a new BaseUseCase.
	 * @param baseRepository An instance of a repository of items of type T.
	 * @param itemName The name of the items in the repository (e.g. 'user').
	 */
	constructor(
		protected readonly baseRepository: TRepository,
		protected itemName: string
	) {}

	/**
	 * Creates a new item in the repository.
	 * @param request A CreateRequest object containing the item to create or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the created item if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
	/**
	 * Retrieves a list of items from the repository.
	 * @param request A GetRequest object containing filters for the items to retrieve or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the list of items if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
	/**
	 * Retrieves a single item from the repository by its id.
	 * @param request A GetByIdRequest object containing the id of the item to retrieve or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the item if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
	/**
	 * Updates an existing item in the repository.
	 * @param request An UpdateRequest object containing the updated item or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with the updated item if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
	/**
	 * Removes an existing item from the repository.
	 * @param request A DeleteRequest object containing the id of the item to delete or an InvalidRequest object if the request is invalid.
	 * @returns A ResponseSuccess object with a message if the operation is successful, or a ResponseFailure object with an error message if it fails.
	 */
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
