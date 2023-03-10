/** Interface representing a skill in the portfolio */
export interface SkillEntity {
	/** Unique skill's identifier*/
	id: string;
	/** Skill's name*/
	name: string;
	/** Reference to the category's identifier - `CategoryEntity`*/
	idCategory: string;
}

/**
 * Returns a new `SkillEntity` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `SkillEntity`
 * @returns The new `SkillEntity` object
 *
 */
export const createSkillEntity = ({
	id = '',
	name = '',
	idCategory = '',
}: Partial<SkillEntity>): SkillEntity => {
	return {
		id,
		name,
		idCategory,
	};
};
