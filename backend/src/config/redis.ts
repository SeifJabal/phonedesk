import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new Redis(redisUrl, {
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
});

redis.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

redis.on('close', () => {
  console.warn('⚠️  Redis connection closed');
});

export default redis;
