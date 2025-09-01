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
  google_client_id: string;
  google_client_secret: string;
  google_callback_url: string;
  express_session_secret: string;
  frontend_base_url: string;
  access_cookie_name: string;
  refresh_cookie_name: string;
  ssl: {
    store_id: string;
    store_pass: string;
    payment_api: string;
    validation_api: string;
    backend: {
      success_url: string;
      fail_url: string;
      cancel_url: string;
    };
    frontend: {
      success_url: string;
      fail_url: string;
      cancel_url: string;
    };
  };
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
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_BASE_URL",
    "ACCESS_COOKIE_NAME",
    "REFRESH_COOKIE_NAME",
    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",
    "SSL_VALIDATION_API",
    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",
    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",
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
    google_client_id: process.env.GOOGLE_CLIENT_ID as string,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL as string,
    express_session_secret: process.env.EXPRESS_SESSION_SECRET as string,
    frontend_base_url: process.env.FRONTEND_BASE_URL as string,
    access_cookie_name: process.env.ACCESS_COOKIE_NAME as string,
    refresh_cookie_name: process.env.REFRESH_COOKIE_NAME as string,
    ssl: {
      store_id: process.env.SSL_STORE_ID as string,
      store_pass: process.env.SSL_STORE_PASS as string,
      payment_api: process.env.SSL_PAYMENT_API as string,
      validation_api: process.env.SSL_VALIDATION_API as string,
      backend: {
        success_url: process.env.SSL_SUCCESS_BACKEND_URL as string,
        fail_url: process.env.SSL_FAIL_BACKEND_URL as string,
        cancel_url: process.env.SSL_CANCEL_BACKEND_URL as string,
      },
      frontend: {
        success_url: process.env.SSL_SUCCESS_FRONTEND_URL as string,
        fail_url: process.env.SSL_FAIL_FRONTEND_URL as string,
        cancel_url: process.env.SSL_CANCEL_FRONTEND_URL as string,
      },
    },
  };
};

export default { ...loadEnvVariables() } as LoadEnvVariableProps;
