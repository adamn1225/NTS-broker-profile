import { getAllBrokerIds } from '../../lib/brokers'; // Adjust the path as needed

export async function generateStaticParams() {
  const brokerIds = await getAllBrokerIds();
  return brokerIds.map((id: string) => ({
    params: { id },
  }));
}