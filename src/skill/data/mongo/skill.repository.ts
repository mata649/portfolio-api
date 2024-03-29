import { baseMongoRepository } from '@/base/data/mongo/base.repository';
import {
	createSkillEntity,
	SkillByCategory,
	SkillEntity,
	SkillRepository,
} from '@/skill/domain';
import { SkillModel } from './skill.model';

/**
 *Repository for interacting with Skill entities in MongoDB
 */
export class SkillMongoRepository
	extends baseMongoRepository<SkillEntity>
	implements SkillRepository
{
	/*
	 *Creates a new SkillMongoRepository instance
	 */
	constructor() {
		super(SkillModel, createSkillEntity);
	}
	/**
	 *Get a list of skills, grouped by category, sorted by the name of the category
	 *@returns a list of skills, with each entry containing a category name, color, and list of skills in the category
	 */
	async getSkillsByCategory(): Promise<SkillByCategory[] | null> {
		const skillsByCategory = await this.model
			.aggregate([
				{
					$group: {
						_id: '$idCategory',
						skills: {
							$addToSet: {
								id: '$id',
								name: '$name',
							},
						},
					},
				},
				{
					$lookup: {
						from: 'categories',
						localField: '_id',
						foreignField: '_id',
						as: 'category',
					},
				},
				{
					$unwind: '$category',
				},
				{
					$project: {
						_id: 0,
					},
				},
				{
					$sort: { 'category.name': 1 },
				},
			])
			.exec();

		const skillsByCategoryParsed = skillsByCategory.map(
			({ skills, category }): SkillByCategory => {
				return {
					skills,
					color: category.color,
					name: category.name,
				};
			}
		);
		return skillsByCategoryParsed;
	}
}
