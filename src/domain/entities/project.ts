export interface ProjectEntity {
	id: string;
	name: string;
	image: string;
	github_url: string;
	id_category: string;
}

export const createProjectEntity = ({
	id = '',
	name = '',
	image = '',
	github_url = '',
	id_category = '',
}: Partial<ProjectEntity>) => {
	return {
		id,
		name,
		image,
		github_url,
		id_category,
	};
};
