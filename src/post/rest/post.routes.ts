import { Router } from 'express';
import { PostMongoRepository } from '@/post/data/mongo/post.repository';
import { PostController } from './post.controller';
import { validateToken } from '@/server/middlewares/validateToken';
import { PostContentMongoRepository } from '@/postContent/data/mongo/postContent.repository';

const router = Router();

const postRepository = new PostMongoRepository();
const postContentRepository = new PostContentMongoRepository();
const postCtrl = new PostController(postRepository, postContentRepository);

router.post('/', validateToken, postCtrl.create);
router.get('/', postCtrl.get);
router.get('/:id', postCtrl.getById);
router.get('/:slug/content', postCtrl.getPostContentBySlug);
router.delete('/:id', validateToken, postCtrl.delete);
router.put('/:id', validateToken, postCtrl.update);

export { router as postRouter };
