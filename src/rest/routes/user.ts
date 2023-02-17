import { Router } from 'express';
import { UserMongoRepository } from 'data/mongodb/repositories';
import { UserController } from 'rest/controllers';
// import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const userRepository = new UserMongoRepository();
const userCtrl = new UserController(userRepository);

router.post('/', userCtrl.create);

router.post('/auth', userCtrl.login);
export { router as userRouter };
