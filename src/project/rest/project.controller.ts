import { BaseController } from '@/base/rest/base.controller';
import { CategoryRepository } from '@/category/domain';
import {
	createProjectEntity,
	ProjectEntity,
	ProjectRepository,
	ProjectRequest,
	ProjectUseCase,
} from '../domain';

/**
 * Class that handle CRUD operations for the post content entities,
 * It extends the BaseController class and inject the needed dependencies
 */
export class ProjectController extends BaseController<
	ProjectEntity,
	ProjectUseCase,
	ProjectRequest
> {
	/**
	 * Creates a new PostContentUseCase instance,
	 * a new PostContentRequest instance, and call the super constructor to pass those dependencies
	 *
	 * @param postRepository - Repository for the post entities
	 * @param postContentRepository - Repository for the post content entities
	 */
	constructor(
		projectRepository: ProjectRepository,
		categoryRepository: CategoryRepository
	) {
		const projectUseCase = new ProjectUseCase(
			projectRepository,
			categoryRepository
		);
		const projectRequest = new ProjectRequest();
		super(projectUseCase, createProjectEntity, projectRequest);
	}
}
