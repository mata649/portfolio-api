import * as dotenv from 'dotenv';

export class Config {
	private static instance: Config;
	readonly PORT: string;
	readonly HOST: string;
	readonly MONGO_URL: string;
	readonly DB_NAME: string;
	readonly JWT_SECRET_SEED: string;
	private constructor() {
		dotenv.config();
		this.PORT = process.env['PORT'] ?? '5000';
		this.MONGO_URL = process.env['MONGO_URL'] ?? '';
		this.DB_NAME = process.env['DB_NAME'] ?? '';
		this.JWT_SECRET_SEED = process.env['JWT_SECRET_SEED'] ?? '';
		this.HOST = process.env['HOST'] ?? '127.0.0.1'
	}

	public static loadConfig(): Config {
		if (!Config.instance) {
			Config.instance = new Config();
		}
		return Config.instance;
	}
}
