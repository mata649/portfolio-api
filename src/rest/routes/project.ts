import { Router } from 'express';
import {
	CategoryMongoRepository,
	ProjectMongoRepository,
} from 'data/mongodb/repositories';
import { ProjectController } from 'rest/controllers';
import { validateToken } from 'rest/middlewares/validateToken';

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
