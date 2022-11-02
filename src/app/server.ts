import express from 'express';
import { Config } from '../config';

const app = express();
const config = Config.loadConfig();

app.use(express.json());

app.listen(config.PORT, ()=>{
	console.log(`Server running on port ${config.PORT}`)
});
