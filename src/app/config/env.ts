import dotenv from "dotenv";

dotenv.config();

interface LoadEnvVariableProps {
  port: string;
  db_url: string;
  node_env: "development" | "production";
}

const loadEnvVariables = (): LoadEnvVariableProps => {
  const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  requiredEnvVariables.forEach((key: string) => {
    if (!process.env[key]) {
      throw new Error(key + " environment variable is missing 🐞");
    }
  });
  return {
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string,
    node_env: process.env.NODE_ENV as "development" | "production",
  };
};

export default { ...loadEnvVariables() } as LoadEnvVariableProps;
