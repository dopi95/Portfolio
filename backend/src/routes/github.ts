import express from 'express';
import axios from 'axios';

const router = express.Router();

let cache: { data: any; ts: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

router.get('/stats', async (req, res) => {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return res.json(cache.data);
  }

  try {
    const headers: any = { 'User-Agent': 'portfolio-app' };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      axios.get('https://api.github.com/users/dopi95', { headers }),
      axios.get('https://api.github.com/users/dopi95/repos?per_page=100', { headers }),
    ]);

    const totalStars = reposRes.data.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);

    const data = {
      repos: userRes.data.public_repos,
      followers: userRes.data.followers,
      totalStars,
      avatar: userRes.data.avatar_url,
      name: userRes.data.name,
    };

    cache = { data, ts: Date.now() };
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch GitHub stats' });
  }
});

export default router;
