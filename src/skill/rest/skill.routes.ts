import { Router } from 'express';

import { SkillController } from './skill.controller';
import { validateToken } from '@/server/middlewares/validateToken';
import { SkillMongoRepository } from '../data/mongo/skill.repository';
import { CategoryMongoRepository } from '@/category/data/mongo/category.repository';

const router = Router();

const skillRepository = new SkillMongoRepository();
const categoryRepository = new CategoryMongoRepository();
const skillCtrl = new SkillController(skillRepository, categoryRepository);

router.post('/', validateToken, skillCtrl.create);
router.get('/', skillCtrl.get);
router.get('/category', skillCtrl.getSkillsByCategory);
router.get('/:id', skillCtrl.getById);
router.delete('/:id', validateToken, skillCtrl.delete);
router.put('/:id', validateToken, skillCtrl.update);

export { router as skillRouter };
