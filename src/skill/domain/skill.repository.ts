import { BaseRepository } from "@/base/domain/base.repository";
import { CategoryEntity } from "@/category/domain";
import { SkillEntity } from "./skill.entity";

/**
 * Interface representing the results of obtaining the skills by category
 */
export interface SkillByCategory extends Omit<CategoryEntity, 'id'> {
	/**
	 *  List of skills by category obtained from the repository, avoiding properties such as idCategory and the id
	 */
	skills: Omit<SkillEntity, 'idCategory' | 'id'>[];
}
/**
 * Interface representing the methods needed by any skill repository
 */
export interface SkillRepository extends BaseRepository<SkillEntity> {
	/**
	 * Gets a list of skills by category from the repository
	 * @returns List of skills by category
	 */
	getSkillsByCategory(): Promise<SkillByCategory[] | null>;
}
