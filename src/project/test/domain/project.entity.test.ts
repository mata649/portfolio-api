import { createProjectEntity } from "@/project/domain";


describe('createProjectEntity', () => {
	it('creates a ProjectEntity object with default values if no parameters are provided', () => {
		const result = createProjectEntity({});

		expect(result).toEqual({
			id: '',
			name: '',
			description: '',
			githubUrl: '',
			idCategory: '',
		});
	});

	it('creates a ProjectEntity object with the provided values', () => {
		const result = createProjectEntity({
			id: '1',
			name: 'Project 1',
			description: 'This is project 1',
			githubUrl: 'https://github.com/user/project1',
			idCategory: '2',
		});

		expect(result).toEqual({
			id: '1',
			name: 'Project 1',
			description: 'This is project 1',
			githubUrl: 'https://github.com/user/project1',
			idCategory: '2',
		});
	});
});
