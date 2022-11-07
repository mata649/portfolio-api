import { Router } from 'express';
import { check } from 'express-validator';
import { SkillMongoRepository } from 'data/mongodb/repositories';
import { SkillUseCase } from 'domain/useCases';
import { SkillController } from 'application/controllers';
import { fieldValidator } from 'application/middlewares/fieldValidator';
import { validateToken } from 'application/middlewares/validateToken';

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
router.get('/:id', skillCtrl.getById);
router.delete('/:id', validateToken, skillCtrl.delete);
router.put('/:id', validateToken, skillCtrl.update);

export { router as skillRouter };
