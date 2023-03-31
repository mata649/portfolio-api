import { Request, Response } from 'express';
import { BaseUseCase } from '@/base/domain/base.useCases';
import { BaseRepository } from '@/base/domain/base.repository';
import { BaseRequest } from '@/base/domain/base.requests';

/**
 * BaseController is a generic class that handles CRUD operations for a given entity, T.
 *  @typeParam T - must have an 'id' property of type string.
 *  @typeParam TUseCase - must be a class that extends BaseUseCase, and take T and BaseRepository<T> as its generic types.
 *  @typeParam TRequest - must be a class that extends BaseRequest, and take T as its generic type.
 */
export class BaseController<
	T extends { id: string },
	TUseCase extends BaseUseCase<T, BaseRepository<T>>,
	TRequest extends BaseRequest<T>
> {
	/**
	 * In the constructor, three dependencies are injected:
	 * @param baseUseCase - instance to handle use cases related to T
	 * @param createItemEntity - A createItemEntity function, used to create an instance of T from a partial object
	 * @param baseRequest - instance to handle requests related to T
	 */
	constructor(
		protected baseUseCase: TUseCase,
		protected createItemEntity: (item: Partial<T>) => T,
		protected baseRequest: TRequest
	) {}

	/**
	 * This method handles the creation of a new instance of T, using data from the request body.
	 * It creates a request object using the baseRequest's create method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 * @param req
	 * @param res
	 */
	create = async (req: Request, res: Response) => {
		const item = this.createItemEntity(req.body);
		const requestObject = this.baseRequest.create(item);
		const response = await this.baseUseCase.create(requestObject);

		res.status(response.type).json(response.value);
	};

	/**
	 * This method handles the update of an existing instance of T, using data from the request body and ID from the request parameters.
	 * It creates a request object using the baseRequest's update method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 * @param {Request} req
	 * @param {Response} res
	 */
	update = async (req: Request, res: Response) => {
		const item = this.createItemEntity({ ...req.body, id: req.params.id });
		const requestObject = this.baseRequest.update(item);
		const response = await this.baseUseCase.update(requestObject);
		res.status(response.type).json(response.value);
	};

	/**
	 * This method handles the retrieval of an existing instance of T, using the ID from the request parameters.
	 * It creates a request object using the baseRequest's getById method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 * @param {Request} req
	 * @param {Response} res
	 */
	getById = async (req: Request, res: Response) => {
		const requestObject = this.baseRequest.getById(req.params.id);
		const response = await this.baseUseCase.getById(requestObject);
		res.status(response.type).json(response.value);
	};
	/**
	 * This method handles the retrieval of a list of T, using filters, limit, page and orderBy from the request parameters.
	 * It creates a request object using the baseRequest's get method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 */
	get = async (req: Request, res: Response) => {
		const filters = this.createItemEntity(req.query as Partial<T>);
		const limit = parseInt(req.query.limit as string);
		const page = parseInt(req.query.currentPage as string);
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

	/**
	 * This method handles the deletion of an existing instance of T, using ID from the request parameters.
	 * It creates a request object using the baseRequest's delete method, and then passes it to the use case.
	 * The response from the use case is then returned to the client with the appropriate status code.
	 * @param {Request} req
	 * @param {Response} res
	 */
	delete = async (req: Request, res: Response) => {
		const requestObject = this.baseRequest.delete(req.params.id);
		const response = await this.baseUseCase.delete(requestObject);
		res.status(response.type).json(response.value);
	};
}
