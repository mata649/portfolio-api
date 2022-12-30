import { Router } from 'express';
import {
	PostContentMongoRepository,
	PostMongoRepository,
} from 'data/mongodb/repositories';
import { PostController } from 'rest/controllers/post';
import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const postRepository = new PostMongoRepository();
const postContentRepository = new PostContentMongoRepository();
const postCtrl = new PostController(postRepository, postContentRepository);

router.post(
	'/',
	validateToken,
	postCtrl.create
);
router.get('/', postCtrl.get);
router.get(
	'/:id',
	postCtrl.getById
);
router.get(
	'/:slug/content',
	postCtrl.getPostContentBySlug
);
router.delete(
	'/:id',
	validateToken,
	postCtrl.delete
);
router.put(
	'/:id',
	validateToken,
	postCtrl.update
);

export { router as postRouter };
