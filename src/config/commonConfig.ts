import { config } from 'dotenv';

config();

export default {
  port: process.env.PORT || 3000,
  apiUri: process.env.API_URL || '',
  jwtSecret: process.env.JWT_SECRET || ''
};
