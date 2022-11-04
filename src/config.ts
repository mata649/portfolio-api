import * as dotenv from 'dotenv';

export class Config {
	private static instance: Config;
	readonly PORT: string;
	readonly MONGO_URL: string;
	readonly DB_NAME: string;
	readonly JWT_SECRET_SEED: string;
	private constructor() {
		dotenv.config();
		this.PORT = process.env['PORT'] ?? '';
		this.MONGO_URL = process.env['MONGO_URL'] ?? '';
		this.DB_NAME = process.env['DB_NAME'] ?? '';
		this.JWT_SECRET_SEED = process.env['JWT_SECRET_SEED'] ?? '';
		console.log(this.PORT);
	}

	public static loadConfig(): Config {
		if (!Config.instance) {
			Config.instance = new Config();
		}
		return Config.instance;
	}
}
