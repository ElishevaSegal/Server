import { config } from "dotenv";
import { Logger } from "../logs/logger";
import { log } from "console";

const configDotEnv = () => {
  config({ path: "src/config/.env" });

  const mode = process.env.NODE_ENV;
  console.log(mode);

  Logger.info(`App is running in ${mode} Mode`);
  Logger.info(`Config file: src/config/${mode}.env`);
  config({ path: `src/config/${mode}.env` });
};

export { configDotEnv };
