/**Interface representing the order of the elements */
export interface OrderBy {
	/**Argument by which elements are ordered*/
	by: string;
	/**Order way, ascendant `asc` or descendant `desc`*/
	order: 'asc' | 'desc';
}
/** Interface representing the filters in a request
 * @typeParam T - Type of properties accepted by the filter
 */
export interface Filters<T> {
	/** Filters of the request */
	filters: Partial<T>;
	/** Limit of elements returned */
	limit: number;
	/** Page number*/
	page: number;
	/**Order of the elements*/
	orderBy: OrderBy[];
}

/**
 * Interface representing the results of a request
 * @typeParam T - Type of object the data contains
 */
export interface Results<T> {
	//** Array of elements */
	data: T[];
	//** The current page*/
	currentPage: number;
	//** Total pages */
	totalPages: number;
}
/**
 * Interface representing the common methods needed by any repository
 * @typeParam T- Type of object used in the methods
 */
export interface BaseRepository<T extends { id?: string }> {
	/**
	 * Creates a new element in the repository
	 * @param item - Element to be created in the repository
	 * @returns The element created in the repository
	 */
	create(item: T): Promise<T>;
	/**
	 * Gets a list of elements from the repository
	 * @param filters - Filters to be used in the request to the repository
	 * @returns `Result` with the elements obtained from the repository,the total pages
	 * and the current page.
	 */
	get(filters: Filters<T>): Promise<Results<T>>;
	/**
	 * Gets a element by id from the repository
	 * @param id - identifier of the element to get
	 * @returns If an element was found, returns element else returns a null
	 */
	getById(id: T['id']): Promise<T | null>;
	/**
	 * Deletes a element by id from the repository
	 * @param id - identifier of the element to delete
	 * @returns If an element was deleted, returns element else returns a null
	 */
	delete(id: T['id']): Promise<T | null>;
	/**
	 * Updates an element in the repository
	 * @param item - Element to be updated in the repository
	 * @returns If an element was updated, returns element else returns a null
	 */
	update(skill: T): Promise<T>;
}

/**
 * Returns a new `Filters` object, setting proper values to
 * the undefined values
 * @param item - The object to create the new `Filters` object
 * @returns The new `Filters` object
 *
 */
export const createFilters = <T>({
	filters = {},
	limit = 10,
	page = 1,
	orderBy = [],
}: Partial<Filters<T>>): Filters<T> => {
	if (isNaN(limit)) {
		limit = 10;
	}
	if (isNaN(page)) {
		page = 1;
	}
	return {
		filters,
		limit,
		page,
		orderBy,
	};
};
