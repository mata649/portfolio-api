import express from 'express';
import { Config } from 'config';
import { dbConnection } from 'data/mongodb/db/mongoInit';
import { userRouter } from 'application/routes';

dbConnection();

const app = express();
const config = Config.loadConfig();
app.use(express.json());
app.use('/users', userRouter);
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`);
});
