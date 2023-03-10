import { Router } from 'express';

import { PostMongoRepository } from '@/post/data/mongo/post.repository';

import { validateToken } from '@/server/middlewares/validateToken';
import { PostContentMongoRepository } from '@/postContent/data/mongo/postContent.repository';
import { PostContentController } from './postContent.controller';

const router = Router();

const postContentRepository = new PostContentMongoRepository();
const postRepository = new PostMongoRepository();
const postContentCtrl = new PostContentController(
	postRepository,
	postContentRepository
);

router.post('/', validateToken, postContentCtrl.create);
router.get('/', postContentCtrl.get);
router.get('/:id', postContentCtrl.getById);
router.delete('/:id', validateToken, postContentCtrl.delete);
router.put('/:id', validateToken, postContentCtrl.update);

export { router as postContentRouter };
