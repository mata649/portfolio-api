import express from 'express';
import { Config } from '../config';
import userRouter from './routes/user.router';

const app = express();
const config = Config.loadConfig();

app.use(express.json());
app.use('/users', userRouter);
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});
