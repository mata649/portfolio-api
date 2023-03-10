import { Router } from 'express';
import { CategoryMongoRepository } from '@/category/data/mongo/category.repository';
import { CategoryController } from './category.controller';
import { validateToken } from '@/server/middlewares/validateToken';

const router = Router();

const categoryRepository = new CategoryMongoRepository();
const categoryCrl = new CategoryController(categoryRepository);

router.post('/', validateToken, categoryCrl.create);
router.get('/', categoryCrl.get);
router.get('/:id', categoryCrl.getById);
router.delete('/:id', validateToken, categoryCrl.delete);
router.put('/:id', validateToken, categoryCrl.update);

export { router as categoryRouter };
