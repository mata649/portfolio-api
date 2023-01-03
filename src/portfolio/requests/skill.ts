import { SkillEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';
/**
 * Class used to validate the skill's requests
 */
export class SkillRequest extends BaseRequest<SkillEntity> {
	create = (
		item: SkillEntity
	): CreateRequest<SkillEntity> | InvalidRequest => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(item, invalidRequest, ['id']);
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(item);
	};

	update = (
		item: SkillEntity
	): InvalidRequest | UpdateRequest<SkillEntity> => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(item, invalidRequest);

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new UpdateRequest(item);
	};
}
