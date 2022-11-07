export interface SkillEntity {
	id: string;
	name: string;
	color: string;
}
export const createSkillEntity = ({
	id = '',
	name = '',
	color = '',
}: Partial<SkillEntity>): SkillEntity => {
	return {
		id,
		name,
		color,
	};
};
