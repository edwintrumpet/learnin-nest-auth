import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const envFilePath = __dirname + '/../../.env';
    const existPath = fs.existsSync(envFilePath);
    if (!existPath) {
      console.log('.env file does not exist');
      process.exit(0);
    }
    this.envConfig = parse(fs.readFileSync(envFilePath));
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
