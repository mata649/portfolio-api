import { Router } from 'express';
import { check } from 'express-validator';
import {
	CategoryMongoRepository,
	ProjectMongoRepository,
} from 'data/mongodb/repositories';
import { ProjectUseCase } from 'domain/useCases';
import { ProjectController } from 'application/controllers';
import { fieldValidator } from 'application/middlewares/fieldValidator';
import { validateToken } from 'application/middlewares/validateToken';

const router = Router();

const projectRepository = new ProjectMongoRepository();
const categoryRepository = new CategoryMongoRepository();
const projectUseCase = new ProjectUseCase(
	projectRepository,
	categoryRepository
);
const projectCtrl = new ProjectController(projectUseCase);

router.post(
	'/',
	check('name').notEmpty().withMessage('name is required'),
	check('image').notEmpty().withMessage('image is required'),
	check('githubUrl').notEmpty().withMessage('githubUrl is required'),
	check('idCategory').isMongoId().withMessage('idCategory is not valid id'),
	fieldValidator,
	validateToken,
	projectCtrl.create
);
router.get('/', projectCtrl.get);
router.get(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	projectCtrl.getById
);
router.delete(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	validateToken,
	projectCtrl.delete
);
router.put(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	check('name').notEmpty().withMessage('name is required'),
	check('image').notEmpty().withMessage('image is required'),
	check('githubUrl').notEmpty().withMessage('githubUrl is required'),
	check('idCategory').isMongoId().withMessage('idCategory is not valid id'),
	fieldValidator,
	validateToken,
	projectCtrl.update
);

export { router as projectRouter };
