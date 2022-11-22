export interface ProjectEntity {
	id: string;
	name: string;
	description: string;
	githubUrl: string;
	idCategory: string;
}

export const createProjectEntity = ({
	id = '',
	name = '',
	description = '',
	githubUrl = '',
	idCategory = '',
}: Partial<ProjectEntity>) => {
	return {
		id,
		name,
		description,
		githubUrl,
		idCategory,
	};
};
