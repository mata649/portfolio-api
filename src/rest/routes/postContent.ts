import { Router } from 'express';
import { check } from 'express-validator';
import {
	PostContentMongoRepository,
	PostMongoRepository,
} from 'data/mongodb/repositories';
import { PostContentUseCase } from 'portfolio/useCases';
import { PostContentController } from 'rest/controllers';
import { fieldValidator } from 'rest/middlewares/fieldValidator';
import { validateToken } from 'rest/middlewares/validateToken';
import { Languages } from 'portfolio/entities/language';

const router = Router();

const postContentRepository = new PostContentMongoRepository();
const postRepository = new PostMongoRepository();
const postContentUseCase = new PostContentUseCase(
	postContentRepository,
	postRepository
);
const postContentCtrl = new PostContentController(postContentUseCase);

router.post(
	'/',
	check('idPost').isMongoId().withMessage('idPost is required'),
	check('language')
		.isIn([Languages.ENG, Languages.ESP])
		.withMessage('language provided is no accepted '),
	check('title').notEmpty().withMessage('title is required'),
	check('content').notEmpty().withMessage('content is required'),
	fieldValidator,
	validateToken,
	postContentCtrl.create
);
router.get('/', postContentCtrl.get);
router.get(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	postContentCtrl.getById
);
router.delete(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	fieldValidator,
	validateToken,
	postContentCtrl.delete
);
router.put(
	'/:id',
	check('id').isMongoId().withMessage('id param is not a valid id'),
	check('idPost').isMongoId().withMessage('idPost is not a valid id'),
	check('language')
		.isIn([Languages.ENG, Languages.ESP])
		.withMessage('language provided is no accepted '),
	check('title').notEmpty().withMessage('title is required'),
	check('content').notEmpty().withMessage('content is required'),
	fieldValidator,
	validateToken,
	postContentCtrl.update
);

export { router as postContentRouter };
