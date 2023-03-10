/** Interface representing a project in the portfolio */
export interface ProjectEntity {
	/** Unique project's identifier*/
	id: string;
	/** Project's name*/
	name: string;
	/** Project's description*/
	description: string;
	/** Project's url to github repository*/
	githubUrl: string;
	/** Reference to the category's identifier - `CategoryEntity`*/
	idCategory: string;
}

/**
 * Returns a new `ProjectEntity` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `ProjectEntity`
 * @returns The new `ProjectEntity` object
 *
 */
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
