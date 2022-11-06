import { Router } from 'express';
import { check } from 'express-validator';
import { UserMongoRepository } from '../../data/mongo/repositories';
import { UserUseCase } from '../../domain/useCases';
import { UserController } from '../controllers';
import { fieldValidator } from '../middlewares/fieldValidator';

const router = Router();

const userRepository = new UserMongoRepository();
const userUseCase = new UserUseCase(userRepository);
const userCtrl = new UserController(userUseCase);

router.post(
	'/',
	check('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('invalid email format'),
	check('name').notEmpty().withMessage('name is required'),
	check('password')
		.isLength({ min: 8 })
		.withMessage('password require at least 8 characters'),
	fieldValidator,
	userCtrl.create
);

router.post(
	'/auth',
	check('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('invalid email format'),
	check('password').notEmpty(),
	fieldValidator,
	userCtrl.login
);
export { router as userRouter };
