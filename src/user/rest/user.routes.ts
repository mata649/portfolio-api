import { validateToken } from '@/server/middlewares/validateToken';
import { Response,Request, Router } from 'express';
import { UserMongoRepository } from '../data/mongo/user.repository';
import { UserController } from './user.controller';

// import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const userRepository = new UserMongoRepository();
const userCtrl = new UserController(userRepository);

// TODO: find some way to handle this better
// router.post('/', userCtrl.create)
router.post('/auth', userCtrl.login);
router.get('/validate', validateToken, async (_req: Request, res: Response) => {
	res.status(200).json({
		message: 'user validated',
	});
});
export { router as userRouter };
