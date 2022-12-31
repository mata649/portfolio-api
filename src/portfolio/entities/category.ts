
/** Interface representing a cateogry in the portfolio */
export interface CategoryEntity {
	/** Unique category's identifier*/
	id: string;
	/** Category's name */
	name: string;
	/** Category's color, represented in hexadecimal format */
	color: string;
}

/**
 * Returns a new `CategoryEntity` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `CategoryEntity`
 * @returns The new `CategoryEntity` object
 *
 */
export const createCategoryEntity = ({
	id = '',
	name = '',
	color = '',
}: Partial<CategoryEntity>): CategoryEntity => {
	return {
		id,
		name,
		color,
	};
};
