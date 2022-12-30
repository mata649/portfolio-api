import { SkillEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';

export class SkillRequest extends BaseRequest<SkillEntity> {
	create = (
		skill: SkillEntity
	): CreateRequest<SkillEntity> | InvalidRequest => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(skill, invalidRequest,['id']);
		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(skill);
	};

	update = (
		skill: SkillEntity
	): InvalidRequest | UpdateRequest<SkillEntity> => {
		let invalidRequest = new InvalidRequest();
		invalidRequest = this.validateEmptyFields(skill, invalidRequest);

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}
		return new UpdateRequest(skill);
	};
}
