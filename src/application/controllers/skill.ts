import { Request, Response } from 'express';
import { CreateSkillDto, UpdateSkillDto } from 'domain/entities/skill';
import { SkillUseCase } from 'domain/useCases';

export class SkillController {
	constructor(private skillUseCase: SkillUseCase) {}

	create = async (req: Request, res: Response) => {

		const skill: CreateSkillDto = {
			color: req.body.color,
			name: req.body.name,
		};
		const response = await this.skillUseCase.create(skill);

		res.status(response.type).json(response.value);
	};

	update = async (req: Request, res: Response) => {
		const skill: UpdateSkillDto = {
			id: req.params.id,
			color: req.body.color,
			name: req.body.name,
		};
		const response = await this.skillUseCase.update(skill);
		res.status(response.type).json(response.value);
	};

	getById = async (req: Request, res: Response) => {
		const response = await this.skillUseCase.getById(req.params.id);
		res.status(response.type).json(response.value);
	};

	get = async (_: Request, res: Response) => {
		const response = await this.skillUseCase.get();
		res.status(response.type).json(response.value);
	};
	delete = async (req: Request, res: Response) => {
		const response = await this.skillUseCase.delete(req.params.id);
		res.status(response.type).json(response.value);
	};
}
