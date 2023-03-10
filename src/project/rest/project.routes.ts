import { CategoryMongoRepository } from '@/category/data/mongo/category.repository';
import { validateToken } from '@/server/middlewares/validateToken';
import { Router } from 'express';
import { ProjectMongoRepository } from '../data/mongo/project.repository';
import { ProjectController } from './project.controller';


const router = Router();

const projectRepository = new ProjectMongoRepository();
const categoryRepository = new CategoryMongoRepository();

const projectCtrl = new ProjectController(projectRepository, categoryRepository);

router.post(
	'/',
	validateToken,
	projectCtrl.create
);
router.get('/', projectCtrl.get);
router.get(
	'/:id',
	projectCtrl.getById
);
router.delete(
	'/:id',
	validateToken,
	projectCtrl.delete
);
router.put(
	'/:id',
	validateToken,
	projectCtrl.update
);

export { router as projectRouter };
