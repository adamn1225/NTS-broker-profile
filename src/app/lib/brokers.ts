export async function getAllBrokerIds(p0?: string): Promise<string[]> {
  const response = await fetch('http://localhost:5000/brokers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const brokers = await response.json();
  return brokers.map((broker: { id: string }) => broker.id);
}