import { CategoryEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';
/**
 * Class used to validate the category's request
 */
export class CategoryRequest extends BaseRequest<CategoryEntity> {
	/**
	 *  Checks if a string is a valid RGB hexadecimal color
	 * @param color - String to validate
	 * @returns If the string is a valid RGB hexadecimal color, returns `true`, else `false`
	 */
	isValidRGB = (color: string) => {
		const rgbRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
		return rgbRegex.test(color);
	};
	/**
	 *  Checks if a string is a valid ARGB hexadecimal color
	 * @param color - String to validate
	 * @returns If the string is a valid ARGB hexadecimal color, returns `true`, else `false`
	 */
	isValidARGB = (color: string) => {
		const argbRegex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;
		return argbRegex.test(color);
	};
	create = (
		item: CategoryEntity
	): CreateRequest<CategoryEntity> | InvalidRequest => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'id',
			'color',
		]);

		if (item.color.length < 1) {
			invalidRequest.addError({
				error: 'color empty',
				parameter: 'color',
			});
		} else if (!this.isValidARGB(item.color) || !this.isValidRGB) {
			invalidRequest.addError({
				error: 'color format is incorrect',
				parameter: 'color',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(item);
	};

	update = (
		item: CategoryEntity
	): InvalidRequest | UpdateRequest<CategoryEntity> => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'color',
		]);
		if (item.color.length < 1) {
			invalidRequest.addError({
				error: 'color empty',
				parameter: 'color',
			});
		} else if (!this.isValidARGB(item.color) || !this.isValidRGB) {
			invalidRequest.addError({
				error: 'color format is incorrect',
				parameter: 'color',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new UpdateRequest(item);
	};
}
