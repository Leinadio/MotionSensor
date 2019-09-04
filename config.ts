import dotenv from 'dotenv-flow'
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  // local
  AUTH0_URL: process.env.AUTH0_URL,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_GRAND_TYPE: process.env.AUTH0_GRAND_TYPE,
};
