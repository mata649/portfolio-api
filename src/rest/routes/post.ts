import { Router } from 'express';
import { check } from 'express-validator';
import { PostContentMongoRepository, PostMongoRepository } from 'data/mongodb/repositories';
import { PostUseCase } from 'portfolio/useCases';
import { PostController } from 'rest/controllers/post';
import { fieldValidator } from 'rest/middlewares/fieldValidator';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const postRepository = new PostMongoRepository();
const postContentRepository = new PostContentMongoRepository();
const postUseCase = new PostUseCase(postRepository, postContentRepository);
const postCtrl = new PostController(postUseCase);

router.post(
	'/',
	check('slug').notEmpty().withMessage('slug is required'),
	check('defaultTitle').notEmpty().withMessage('defaultTitle is required'),
	fieldValidator,
	validateToken,
	postCtrl.create
);
router.get('/', postCtrl.get);
router.get(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	postCtrl.getById
);
router.get(
	'/:slug/content',
	check('slug').notEmpty().withMessage('slug param can not be empty'),
	fieldValidator,
	postCtrl.getPostContentBySlug
);
router.delete(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	validateToken,
	postCtrl.delete
);
router.put(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	check('slug').notEmpty().withMessage('slug is required'),
	check('defaultTitle').notEmpty().withMessage('defaultTitle is required'),

	fieldValidator,
	validateToken,
	postCtrl.update
);

export { router as postRouter };
