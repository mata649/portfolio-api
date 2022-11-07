export interface BaseRepository<T extends { id?: string }> {
	create(item: T): Promise<T>;
	get(): Promise<T[] | null>;
	getById(id: T['id']): Promise<T | null>;
	delete(id: T['id']): Promise<T>;
	update(skill: T): Promise<T>;
}
