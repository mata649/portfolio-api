import { Router } from 'express';
import { UserMongoRepository } from 'data/mongodb/repositories';
import { UserUseCase } from 'portfolio/useCases';
import { UserController } from 'rest/controllers';
// import { validateToken } from 'rest/middlewares/validateToken';

const router = Router();

const userRepository = new UserMongoRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);

router.post('/', userCtrl.create);

router.post(
	'/auth',
	userCtrl.login
);
export { router as userRouter };
