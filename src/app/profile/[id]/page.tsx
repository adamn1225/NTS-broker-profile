import React from 'react';
import '../../globals.css';

interface BrokerPageProps {
  params: {
    id: string;
  };
}

interface BrokerPageProps {
  params: {
    id: string;
  };
}

const BrokerPage: React.FC<BrokerPageProps> = async ({ params }) => {
  const response = await fetch(`http://localhost:5000/brokers/${params.id}`);
  const broker = await response.json();

  return (
    <div>
      <div className="relative h-full max-h-max w-screen">
        <div className="absolute inset-0 bg-form-bg bg-cover bg-center opacity-50"></div>
        <div className="absolute inset-0 bg-gray-950 opacity-70"></div>
        <div className="relative z-10 flex flex-col md:h-1/2 py-28 md:py-0">
          <div className="relative flex flex-col rounded-md drop-shadow-xl md:mt-20 md:pb-36 md:mx-96 md:gap-6 gap-10 justify-start items-center flex-1">
            {/* Rest of your component */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerPage;