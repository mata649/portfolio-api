import { ProjectEntity } from 'portfolio/entities';
import {
	BaseRequest,
	CreateRequest,
	InvalidRequest,
	UpdateRequest,
} from './request';

export class ProjectRequest extends BaseRequest<ProjectEntity> {
	isValidGithubUrl = (githubUrl: string) => {
		const githubUrlRegex = /https:\/\/github\.com\/.*\/.*/;
		return githubUrlRegex.test(githubUrl);
	};

	create = (
		project: ProjectEntity
	): InvalidRequest | CreateRequest<ProjectEntity> => {
		let invalidRequest = new InvalidRequest();

		invalidRequest = this.validateEmptyFields(project, invalidRequest, [
			'id',
			'githubUrl',
		]);
		if (project.githubUrl.length < 1) {
			invalidRequest.addError({
				error: 'githubUrl empty',
				parameter: 'githubUrl',
			});
		} else if (!this.isValidGithubUrl(project.githubUrl)) {
			invalidRequest.addError({
				error: 'the url provided is not a valid github url',
				parameter: 'githubUrl',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(project);
	};
	update = (
		project: ProjectEntity
	): InvalidRequest | UpdateRequest<ProjectEntity> => {
		let invalidRequest = new InvalidRequest();

		invalidRequest = this.validateEmptyFields(project, invalidRequest, [
			'githubUrl',
		]);
		if (project.githubUrl.length < 1) {
			invalidRequest.addError({
				error: 'githubUrl empty',
				parameter: 'githubUrl',
			});
		} else if (!this.isValidGithubUrl(project.githubUrl)) {
			invalidRequest.addError({
				error: 'the url provided is not a valid github url',
				parameter: 'githubUrl',
			});
		}

		if (invalidRequest.hasErrors()) {
			return invalidRequest;
		}

		return new CreateRequest(project);
	};
}
