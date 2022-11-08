export interface CategoryEntity {
	id: string;
	name: string;
	color: string;
}
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
