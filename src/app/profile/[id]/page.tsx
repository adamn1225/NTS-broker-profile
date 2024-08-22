"use client";
import React, { useEffect, useState } from 'react';
import { getBrokerById } from '../../lib/brokers'; // Adjust the path as needed
import { Broker } from '../types'; // Adjust the path as needed
import AutoForm from '@components/autoForm';
import LtlForm from '@components/ltlForm';
import FreightForm from '@components/freightForm';

interface BrokerPageProps {
  params: {
    id: string;
  };
}

const BrokerPage: React.FC<BrokerPageProps> = ({ params }) => {
  const [broker, setBroker] = useState<Broker | null>(null);

  useEffect(() => {
    const fetchBroker = async () => {
      const brokerData = await getBrokerById(params.id);
      setBroker(brokerData);
    };

    fetchBroker();
  }, [params.id]);

  if (!broker) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="w-full h-full bg-hero-bg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center gap-3 ">
        <div className="h-1/2 bg-gray-300/80 my-16 py-12 rounded-sm drop-shadow-lg mx-2 md:mx-80 flex flex-col align-bottom justify-center gap-3 px-20 text-center">
          <h1 className='text-3xl font-extrabold font-russo text-gray-900/90 underline underline-offset-4'>GET A SHIPPING RATE FROM AN EXPERT</h1>
          <h2 className='text-xl font-extrabold font-russo text-gray-900/90'>What are you shipping?</h2>
          <div className="flex md:flex-row flex-col justify-center items-center gap-3 px-12">
            <AutoForm />
            <FreightForm />
            <LtlForm />
          </div>
          <div className="mt-4">
            <h3 className='text-lg font-extrabold font-russo text-gray-900/90'>You can also contact me directly:</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerPage;