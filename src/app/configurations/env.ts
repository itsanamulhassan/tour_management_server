import dotenv from "dotenv";

dotenv.config();

interface LoadEnvVariableProps {
  port: string;
  db_url: string;
  node_env: "development" | "production";
  jwt_access_secret: string;
  jwt_access_expires_in: string;
  jwt_refresh_secret: string;
  jwt_refresh_expires_in: string;
  bcrypt_salt_round: number;
  super_admin_email: string;
  super_admin_password: string;
}

const loadEnvVariables = (): LoadEnvVariableProps => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_SECRET_EXPIRES_IN",
    "JWT_REFRESH_SECRET",
    "TWT_REFRESH_SECRET_EXPIRES_IN",
    "BCRYPT_SALT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
  ];
  requiredEnvVariables.forEach((key: string) => {
    if (!process.env[key]) {
      throw new Error(key + " environment variable is missing 🐞");
    }
  });
  return {
    port: process.env.PORT as string,
    db_url: process.env.DB_URL as string,
    node_env: process.env.NODE_ENV as "development" | "production",
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_access_expires_in: process.env.JWT_ACCESS_SECRET_EXPIRES_IN as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_refresh_expires_in: process.env.TWT_REFRESH_SECRET_EXPIRES_IN as string,
    bcrypt_salt_round: Number(process.env.BCRYPT_SALT_ROUND) as number,
    super_admin_email: process.env.SUPER_ADMIN_EMAIL as string,
    super_admin_password: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export default { ...loadEnvVariables() } as LoadEnvVariableProps;
