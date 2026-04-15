import dotenv from "dotenv";
import path from "path";

const serverRoot = path.resolve(import.meta.dirname, "..", "..");

class EnvLoader {
  private static instance: EnvLoader;
  
  private constructor() {
    dotenv.config({ path: path.resolve(serverRoot, ".env") });
  }

  static getInstance(): EnvLoader {
    if (!EnvLoader.instance) {
      EnvLoader.instance = new EnvLoader();
    }
    return EnvLoader.instance;
  }

  getEnv(key: string): string {
    return process.env[key] ?? "";
  }
}

export default EnvLoader.getInstance();