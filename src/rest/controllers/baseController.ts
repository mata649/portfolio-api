import { Request, Response } from 'express';
import { BaseUseCase } from 'portfolio/useCases/baseUseCase';
import { BaseRepository } from 'portfolio/repositories/baseRepository';
import { BaseRequest } from 'portfolio/requests';

export class BaseController<
	T extends { id: string },
	TUseCase extends BaseUseCase<T, BaseRepository<T>>,
	TRequest extends BaseRequest<T>
> {
	constructor(
		protected baseUseCase: TUseCase,
		protected createItemEntity: (item: Partial<T>) => T,
		protected baseRequest: TRequest
	) {}

	create = async (req: Request, res: Response) => {
		const item = this.createItemEntity(req.body);
		const requestObject = this.baseRequest.create(item);
		const response = await this.baseUseCase.create(requestObject);

		res.status(response.type).json(response.value);
	};

	update = async (req: Request, res: Response) => {
		const item = this.createItemEntity({ ...req.body, id: req.params.id });
		const requestObject = this.baseRequest.update(item);
		const response = await this.baseUseCase.update(requestObject);
		res.status(response.type).json(response.value);
	};

	getById = async (req: Request, res: Response) => {
		const requestObject = this.baseRequest.getById(req.params.id);
		const response = await this.baseUseCase.getById(requestObject);
		res.status(response.type).json(response.value);
	};

	get = async (req: Request, res: Response) => {
		const filters = this.createItemEntity(req.query as Partial<T>);
		const limit = parseInt(req.query.limit as string);
		const page = parseInt(req.query.page as string);
		const orderBy = req.query.orderBy as string;

		const requestObject = this.baseRequest.get(
			filters,
			limit,
			page,
			orderBy
		);
		const response = await this.baseUseCase.get(requestObject);
		res.status(response.type).json(response.value);
	};
	delete = async (req: Request, res: Response) => {
		const requestObject = this.baseRequest.delete(req.params.id);
		const response = await this.baseUseCase.delete(requestObject);
		res.status(response.type).json(response.value);
	};
}
