import React from 'react';
import '../globals.css';
import CreateArticleForm from '@components/CreateArticleForm';
import UpdateProfileForm from './UpdateProfile';

interface BrokerDashboardContainerProps {
  brokerId: string;
}

const BrokerDashboardContainer: React.FC<BrokerDashboardContainerProps> = ({ brokerId }) => {
  return (
    <div>
      <h1>Broker Dashboard</h1>
      <CreateArticleForm brokerId={brokerId} />
      <UpdateProfileForm brokerId={brokerId} />
    </div>
  );
};

export default BrokerDashboardContainer;