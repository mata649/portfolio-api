import { Router } from 'express';
import { CategoryMongoRepository } from 'data/mongodb/repositories';
import { CategoryController } from 'rest/controllers';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const categoryRepository = new CategoryMongoRepository();
const categoryCrl = new CategoryController(categoryRepository);

router.post(
	'/',
	validateToken,
	categoryCrl.create
);
router.get('/', categoryCrl.get);
router.get(
	'/:id',
	categoryCrl.getById
);
router.delete(
	'/:id',
	validateToken,
	categoryCrl.delete
);
router.put(
	'/:id',
	validateToken,
	categoryCrl.update
);

export { router as categoryRouter };
