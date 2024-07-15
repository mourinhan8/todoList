import path from 'path';
import dotenv from 'dotenv';
const envFilePath = path.resolve(__dirname, '..', `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`);

dotenv.config({ path: envFilePath });

const config = {
  app: {
    port: process.env.APP_PORT,
  },

  db: {
    database: process.env.DATABASE_NAME || 'database.sqlite',
  },

  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
};

export default config;
