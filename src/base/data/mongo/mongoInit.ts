import mongoose from 'mongoose';
import { Config } from '@/config';
export const dbConnection = async () => {
	const config = Config.loadConfig();

	try {
		mongoose.connect(config.MONGO_URL as string,{
			dbName:'portfolio_api'
		});
		console.log("Database ready")

	} catch (error) {
		console.error(error);
		throw new Error('Connection error');
	}
};

