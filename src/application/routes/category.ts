import { Router } from 'express';
import { check } from 'express-validator';
import { CategoryMongoRepository } from 'data/mongodb/repositories';
import { CategoryUseCase } from 'domain/useCases';
import { CategoryController } from 'application/controllers';
import { fieldValidator } from 'application/middlewares/fieldValidator';
import { validateToken } from 'application/middlewares/validateToken';

const router = Router();

const categoryRepository = new CategoryMongoRepository();
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryCrl = new CategoryController(categoryUseCase);

router.post(
	'/',
	check('name').notEmpty().withMessage('name is required'),
	check('color').notEmpty().withMessage('color is required'),
	fieldValidator,
	validateToken,
	categoryCrl.create
);
router.get('/', categoryCrl.get);
router.get('/:id', categoryCrl.getById);
router.delete('/:id', validateToken, categoryCrl.delete);
router.put('/:id', validateToken, categoryCrl.update);

export { router as categoryRouter };
