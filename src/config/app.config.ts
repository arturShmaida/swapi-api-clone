import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  baseUrl: process.env.APP_BASE_URL || `http://localhost:${parseInt(process.env.PORT, 10)}/`,
  jwtSecret: process.env.JWT_SECRET 
}));
