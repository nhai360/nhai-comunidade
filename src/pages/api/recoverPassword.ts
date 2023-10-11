import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@/client';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const { params } = req.body
    await api.post("/auth/recover", params);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
