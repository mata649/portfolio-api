import { Router } from 'express';
import {
	CategoryMongoRepository,
	SkillMongoRepository,
} from 'data/mongodb/repositories';
import { SkillController } from 'rest/controllers';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const skillRepository = new SkillMongoRepository();
const categoryRepository = new CategoryMongoRepository();
const skillCtrl = new SkillController(skillRepository, categoryRepository);

router.post('/', validateToken, skillCtrl.create);
router.get('/', skillCtrl.get);
router.get('/category', skillCtrl.getSkillsByCategory);
router.get(
	'/:id',
	skillCtrl.getById
);
router.delete(
	'/:id',
	validateToken,
	skillCtrl.delete
);
router.put(
	'/:id',
	validateToken,
	skillCtrl.update
);

export { router as skillRouter };
