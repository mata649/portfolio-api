import { Router } from 'express';
import {
	PostContentMongoRepository,
	PostMongoRepository,
} from 'data/mongodb/repositories';
import { PostContentController } from 'rest/controllers';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const postContentRepository = new PostContentMongoRepository();
const postRepository = new PostMongoRepository();
const postContentCtrl = new PostContentController(
	postRepository,
	postContentRepository
);

router.post(
	'/',
	validateToken,
	postContentCtrl.create
);
router.get('/', postContentCtrl.get);
router.get(
	'/:id',
	postContentCtrl.getById
);
router.delete(
	'/:id',
	validateToken,
	postContentCtrl.delete
);
router.put(
	'/:id',
	validateToken,
	postContentCtrl.update
);

export { router as postContentRouter };
