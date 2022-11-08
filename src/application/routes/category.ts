import { Router } from 'express';
import { check } from 'express-validator';
import { CategoryMongoRepository } from 'data/mongodb/repositories';
import { CategoryUseCase } from 'portfolio/useCases';
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
router.get(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	categoryCrl.getById
);
router.delete(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	validateToken,
	categoryCrl.delete
);
router.put(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	check('name').notEmpty().withMessage('name is required'),
	check('color').notEmpty().withMessage('color is required'),
	fieldValidator,
	validateToken,
	categoryCrl.update
);

export { router as categoryRouter };
