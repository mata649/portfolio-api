import { BaseRepository } from 'domain/repositories/baseRepository';
import {
	ResponseFailure,
	ResponseSuccess,
	ResponseTypes,
} from 'domain/response';

export class BaseUseCase<T extends { id?: string }> {
	constructor(
		private readonly baseRepository: BaseRepository<T>,
		private createEntity: (item: Partial<T>) => T,
		private itemName: string
	) {}

	async create(
		itemDto: Partial<T>
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const skill = this.createEntity({ ...itemDto });
			const skillCreate = await this.baseRepository.create(skill);

			return new ResponseSuccess(ResponseTypes.CREATED, skillCreate);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async get(): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const items = await this.baseRepository.get();

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
				`${this.itemName} does not exists`
			);
		} catch (error) {
			return new ResponseFailure(
				ResponseTypes.SYSTEM_ERROR,
				'system error'
			);
		}
	}
	async update(
		skillDto: Partial<T>
	): Promise<ResponseSuccess | ResponseFailure> {
		try {
			const item = this.createEntity({ ...skillDto });

			const itemFound = await this.baseRepository.getById(item.id);
			if (!itemFound) {
				return new ResponseFailure(
					ResponseTypes.RESOURCE_ERROR,
					`${this.itemName} does not exists`
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
					`${this.itemName} does not exists`
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
