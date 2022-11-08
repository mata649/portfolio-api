export interface BaseRepository<T extends { id?: string }> {
	create(item: T): Promise<T>;
	get(filters: Partial<T>): Promise<T[] | null>;
	getById(id: T['id']): Promise<T | null>;
	delete(id: T['id']): Promise<T>;
	update(skill: T): Promise<T>;
}
