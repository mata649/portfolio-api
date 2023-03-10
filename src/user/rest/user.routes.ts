import { Router } from 'express';
import { UserMongoRepository } from '../data/mongo/user.repository';
import { UserController } from './user.controller';

// import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const userRepository = new UserMongoRepository();
const userCtrl = new UserController(userRepository);

router.post('/', userCtrl.create);

router.post('/auth', userCtrl.login);
export { router as userRouter };
