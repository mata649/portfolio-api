import { Router } from 'express';
import { check } from 'express-validator';
import { SkillMongoRepository } from 'data/mongodb/repositories';
import { SkillUseCase } from 'portfolio/useCases';
import { SkillController } from 'rest/controllers';
import { fieldValidator } from 'rest/middlewares/fieldValidator';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const skillRepository = new SkillMongoRepository();
const skillUseCase = new SkillUseCase(skillRepository);
const skillCtrl = new SkillController(skillUseCase);

router.post(
	'/',
	check('name').notEmpty().withMessage('name is required'),
	check('color').notEmpty().withMessage('color is required'),
	fieldValidator,
	validateToken,
	skillCtrl.create
);
router.get('/', skillCtrl.get);
router.get(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	skillCtrl.getById
);
router.delete(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	validateToken,
	skillCtrl.delete
);
router.put(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	check('name').notEmpty().withMessage('name is required'),
	check('color').notEmpty().withMessage('color is required'),
	fieldValidator,
	validateToken,
	skillCtrl.update
);

export { router as skillRouter };