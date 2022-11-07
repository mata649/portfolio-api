import { BaseRepository } from 'domain/repositories/baseRepository';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'domain/response';

export class BaseUseCase<T extends { id?: string }> {
	constructor(
		protected readonly baseRepository: BaseRepository<T>,
		protected itemName: string
	) {}

	async create(item: T): Promise<ResponseSuccess | ResponseFailure> {
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
	async get(filters: Partial<T>): Promise<ResponseSuccess | ResponseFailure> {
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
	async getById(id: T['id']): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const item = await this.baseRepository.getById(id);
			if (item) {
				return new ResponseSuccess(ResponseTypes.OK, item);
			}
			return new ResponseFailure(
				ResponseTypes.RESOURCE_ERROR,
				`${this.itemName} does not exiss`
			);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async update(item: T): Promise<ResponseSuccess | ResponseFailure> {
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
	async delete(id: T['id']): Promise<ResponseSuccess | ResponseFailure> {
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
