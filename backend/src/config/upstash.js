const { Ratelimit } = require("@upstash/ratelimit");
const { Redis } = require("@upstash/redis");
require("dotenv").config();

// 10 requests per 20 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

module.exports = rateLimit;
