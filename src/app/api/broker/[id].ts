import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBrokerIds } from '../../lib/brokers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const broker = await getAllBrokerIds(id as string);
    if (!broker) {
      console.log(`No broker found for id: ${id}`);
      return res.status(404).json({ message: 'Broker not found' });
    }
    res.status(200).json(broker);
  } catch (error) {
    console.error('Error fetching broker data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}