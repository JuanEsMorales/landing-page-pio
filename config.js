import { config } from 'dotenv';

config();

export const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT = 5000, SECRET } = process.env;