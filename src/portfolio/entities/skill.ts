export interface SkillEntity {
	id: string;
	name: string;
	idCategory: string;
}
export const createSkillEntity = ({
	id = '',
	name = '',
	idCategory = '',
}: Partial<SkillEntity>): SkillEntity => {
	return {
		id,
		name,
		idCategory
	};
};
