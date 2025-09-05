import { Redis } from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_URL || "redis://localhost:6380",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6380,
  password: process.env.REDIS_PASSWORD || "",
  maxRetriesPerRequest: 0
});
