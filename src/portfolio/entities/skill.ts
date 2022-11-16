export interface SkillEntity {
	id: string;
	name: string;
	color: string;
	idCategory: string;
}
export const createSkillEntity = ({
	id = '',
	name = '',
	color = '',
	idCategory = '',
}: Partial<SkillEntity>): SkillEntity => {
	return {
		id,
		name,
		color,
		idCategory
	};
};
