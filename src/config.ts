import * as dotenv from 'dotenv';

export class Config {
	private static instance: Config;
	readonly PORT: string | undefined;
	private constructor() {
		dotenv.config();
		this.PORT = process.env['PORT'];
		console.log(this.PORT);
	}

	public static loadConfig(): Config {
		if (!Config.instance) {
			Config.instance = new Config();
		}
		return Config.instance;
	}
}
