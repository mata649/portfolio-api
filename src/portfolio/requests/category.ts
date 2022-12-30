import { CategoryEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';

export class CategoryRequest extends BaseRequest<CategoryEntity> {
	isValidRGB = (color: string) => {
		const rgbRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
		return rgbRegex.test(color);
	};
	isValidARGB = (color: string) => {
		const argbRegex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
		return argbRegex.test(color);
	};
	create = (
		category: CategoryEntity
	): CreateRequest<CategoryEntity> | InvalidRequest => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(category, invalidRequest,['id','color']);

		if (category.color.length < 1) {
			invalidRequest.addError({
				error: 'color empty',
				parameter: 'color',
			});
		}else if (!this.isValidARGB(category.color) || !this.isValidRGB) {
			invalidRequest.addError({
				error: 'color format is incorrect',
				parameter: 'color',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(category);
	};

	update = (
		category: CategoryEntity
	): InvalidRequest | UpdateRequest<CategoryEntity> => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(category, invalidRequest, ['color'])
		if (category.color.length < 1) {
			invalidRequest.addError({
				error: 'color empty',
				parameter: 'color',
			});
		}else if (!this.isValidARGB(category.color) || !this.isValidRGB) {
			invalidRequest.addError({
				error: 'color format is incorrect',
				parameter: 'color',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new UpdateRequest(category);
	};
}
