import { createSkillEntity } from 'portfolio/entities';

describe('createSkillEntity', () => {
	it('creates a SkillEntity object with default values if no parameters are provided', () => {
		const result = createSkillEntity({});

		expect(result).toEqual({
			id: '',
			name: '',
			idCategory: '',
		});
	});

	it('creates a SkillEntity object with the provided values', () => {
		const result = createSkillEntity({
			id: '1',
			name: 'Skill 1',
			idCategory: '2',
		});

		expect(result).toEqual({
			id: '1',
			name: 'Skill 1',
			idCategory: '2',
		});
	});
});
