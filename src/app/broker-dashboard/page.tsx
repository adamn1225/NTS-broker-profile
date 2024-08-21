"use client";
import React, { useState, useEffect } from 'react';
import BrokerDashboardContainer from './BrokerDashboardContainer';

interface BrokerDashboardPageProps {
  params: {
    id: string;
  };
}

const BrokerDashboardPage: React.FC<BrokerDashboardPageProps> = ({ params }) => {
  const [broker, setBroker] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    console.log('Fetching broker with ID:', params.id);
    if (!params || !params.id) {
      console.error('Broker ID is undefined');
      setLoading(false);
      return;
    }

    const fetchBroker = async () => {
      try {
        const response = await fetch(`/api/broker/${params.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBroker(data);
      } catch (error) {
        console.error('Failed to fetch broker:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBroker();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!broker) {
    return <div>No broker found</div>;
  }

  return (
    <BrokerDashboardContainer brokerId={broker.id} />
  );
};

export default BrokerDashboardPage;