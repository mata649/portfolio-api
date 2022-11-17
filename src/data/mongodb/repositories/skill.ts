import { baseMongoRepository } from './baseMongoRepository';
import { SkillEntity, createSkillEntity } from 'portfolio/entities';
import { SkillModel } from 'data/mongodb/models/';
import { SkillByCategory, SkillRepository } from 'portfolio/repositories';

export class SkillMongoRepository
	extends baseMongoRepository<SkillEntity>
	implements SkillRepository
{
	constructor() {
		super(SkillModel, createSkillEntity);
	}
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
								color: '$color',
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
