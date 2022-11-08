export interface ProjectEntity {
	id: string;
	name: string;
	image: string;
	githubUrl: string;
	idCategory: string;
}

export const createProjectEntity = ({
	id = '',
	name = '',
	image = '',
	githubUrl = '',
	idCategory = '',
}: Partial<ProjectEntity>) => {
	return {
		id,
		name,
		image,
		githubUrl,
		idCategory,
	};
};
