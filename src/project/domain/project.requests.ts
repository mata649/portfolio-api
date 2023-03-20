import { ProjectEntity } from '.';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from '@/base/domain/base.requests';
/**
 * Class used to validate the project's requests
 */
export class ProjectRequest extends BaseRequest<ProjectEntity> {
	/**
	 *  Checks if a string is a valid GitHub URL
	 * @param color - String to validate
	 * @returns If the string is a valid GitHub URL, returns `true`, else `false`
	 */
	isValidGithubUrl = (githubUrl: string) => {
		const githubUrlRegex = /https:\/\/github\.com\/.*\/.*/;
		return githubUrlRegex.test(githubUrl);
	};

	create = (
		item: ProjectEntity
	): InvalidRequest | CreateRequest<ProjectEntity> => {
		let invalidRequest = new InvalidRequest();

		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'id',
			'githubUrl',
		]);
		if (item.githubUrl.length < 1) {
			invalidRequest.addError({
				error: 'githubUrl empty',
				parameter: 'githubUrl',
			});
		} else if (!this.isValidGithubUrl(item.githubUrl)) {
			invalidRequest.addError({
				error: 'the url provided is not a valid github url',
				parameter: 'githubUrl',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(item);
	};
	update = (
		item: ProjectEntity
	): InvalidRequest | UpdateRequest<ProjectEntity> => {
		let invalidRequest = new InvalidRequest();

		invalidRequest = this.validateEmptyFields(item, invalidRequest, [
			'githubUrl',
		]);
		if (item.githubUrl.length < 1) {
			invalidRequest.addError({
				error: 'githubUrl empty',
				parameter: 'githubUrl',
			});
		} else if (!this.isValidGithubUrl(item.githubUrl)) {
			invalidRequest.addError({
				error: 'the url provided is not a valid github url',
				parameter: 'githubUrl',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new UpdateRequest(item);
	};
}
