import { Request, Response } from 'express';
import { BaseUseCase } from 'portfolio/useCases/baseUseCase';
import { BaseRepository, createFilters } from 'portfolio/repositories/baseRepository';

export class BaseController<
	T extends { id?: string },
	TUseCase extends BaseUseCase<T, BaseRepository<T>>
> {
	constructor(
		protected baseUseCase: TUseCase,
		protected createItemEntity: (item: Partial<T>) => T
	) {}

	create = async (req: Request, res: Response) => {
		const item = this.createItemEntity(req.body);

		const response = await this.baseUseCase.create(item);

		res.status(response.type).json(response.value);
	};

	update = async (req: Request, res: Response) => {
		const item = this.createItemEntity({ ...req.body, id: req.params.id });
		const response = await this.baseUseCase.update(item);
		res.status(response.type).json(response.value);
	};

	getById = async (req: Request, res: Response) => {
		const response = await this.baseUseCase.getById(req.params.id);
		res.status(response.type).json(response.value);
	};

	get = async (req: Request, res: Response) => {
		const filters = createFilters<T>({
			filters:this.createItemEntity(req.query as Partial<T>),
			limit:parseInt(req.query.limit as string),
			page:parseInt(req.query.page as string),
		})
		const response = await this.baseUseCase.get(filters);
		res.status(response.type).json(response.value);

	};
	delete = async (req: Request, res: Response) => {
		const response = await this.baseUseCase.delete(req.params.id);
		res.status(response.type).json(response.value);
	};
}
