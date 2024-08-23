// lib/brokers.js
export async function getBrokerById() {
  if (process.env.NODE_ENV === 'production') {
    // Use mock data during the build process
    return ['1', '2', '3'];
  } else {
    const response = await fetch('http://localhost:5000/brokers');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const brokers = await response.json();
    return brokers.map((broker) => broker.id.toString());
  }
}