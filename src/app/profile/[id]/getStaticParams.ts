import { getBrokerById } from '../../lib/brokers'; // Adjust the path as needed

export async function generateStaticParams() {
  const brokerIds = await getBrokerById();
  return brokerIds.map((id: string) => ({
    params: { id },
  }));
}