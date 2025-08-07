import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit('userId');
    if (!success) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    next();
  } catch (error) {
    console.error('Rate limit error:', error);
    next(error); // Pass the error to the next middleware
  }
};

export default rateLimiter;
