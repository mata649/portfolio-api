export interface Filters<T> {
	filters: Partial<T>;
	limit: number;
	page: number;
	orderBy: string
}

export interface Results<T> {
	data: T[];
	currentPage: number;
	totalPages: number;
}
export interface BaseRepository<T extends { id?: string }> {
	create(item: T): Promise<T>;
	get(filters: Filters<T>): Promise<Results<T> | null>;
	getById(id: T['id']): Promise<T | null>;
	delete(id: T['id']): Promise<T | null>;
	update(skill: T): Promise<T>;
}

export const createFilters = <T>({
	filters = {},
	limit = 10,
	page = 1,
	orderBy = ''
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
		orderBy
	};
};
