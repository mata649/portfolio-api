export interface CategoryEntity {
	id: string;
	name: string;
	color: string;
}
export const createCategoryEntity = ({
	id,
	name,
	color,
}: Partial<CategoryEntity>): CategoryEntity => {
	return { id: id ?? '', name: name ?? '', color: color ?? '' };
};
