import "dotenv/config";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} not found`);
  }
  return value;
};

export const MONGO_URI = getEnv("MONGO_URI");
export const PORT = getEnv("PORT");

export const JWT_SECRET = getEnv("JWT_SECRET");

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const FRONTEND_URL = getEnv("FRONTEND_URL", "http://localhost:3000");
