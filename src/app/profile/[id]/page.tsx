"use client";
import React from 'react';
import { getBrokerById } from '../../lib/brokers'; // Adjust the path as needed
import { Broker } from '../types'; // Adjust the path as needed
import AutoForm from'@components/autoForm';
import LtlForm from '@components/ltlForm';
import FreightForm from '@components/freightForm';

interface BrokerPageProps {
  params: {
    id: string;
  };
}

const BrokerPage: React.FC<BrokerPageProps> = async ({ params }) => {
  const broker = await getBrokerById(params.id);

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
          <ul>
            <li className="text-gray-900/90 font-bold text-md">
              {broker.first_name} - {broker.email} - {broker.phone_number}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <article className='grid grid-cols-3 gap-4 items-center text-center px-28 py-12 bg-slate-300/80'>
  <div className='flex flex-col justify-center items-center gap-3'>
    <img className='rounded-md drop-shadow-lg' src='https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg' alt={broker.first_name} />
    <h1 className='text-slate-900 text-xl font-exo font-semibold'>Title about load</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Quis illo ea totam cumque esse omnis sapiente nam odio, inventore aperiam dicta magnam exercitationem veniam tempora quasi dignissimos harum. Rerum, quod.</p>
    <a href='#' className='text-blue-900 font-semibold underline hover:text-slate-700'>Read more</a>
  </div>
  <div className='flex flex-col justify-center items-center gap-3'>
    <img className='rounded-md drop-shadow-lg' src='https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg' alt={broker.first_name} />
    <h1 className='text-slate-900 text-xl font-exo font-semibold'>Title about load</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Quis illo ea totam cumque esse omnis sapiente nam odio, inventore aperiam dicta magnam exercitationem veniam tempora quasi dignissimos harum. Rerum, quod.</p>
    <a href='#' className='text-blue-900 font-semibold underline hover:text-slate-700'>Read more</a>
  </div>
  <div className='flex flex-col justify-center items-center gap-3'>
    <img className='rounded-md drop-shadow-lg' src='https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg' alt={broker.first_name} />
    <h1 className='text-slate-900 text-xl font-exo font-semibold'>Title about load</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
       Quis illo ea totam cumque esse omnis sapiente nam odio, inventore aperiam dicta magnam exercitationem veniam tempora quasi dignissimos harum. Rerum, quod.</p>
    <a href='#' className='text-blue-900 font-semibold underline hover:text-slate-700'>Read more</a>
  </div>
</article>
    </div>
  

  );
};

export default BrokerPage;

export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:4000/brokers');
    
    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const brokers: Broker[] = await response.json();

    return brokers.map((broker) => ({
      id: broker.id.toString(),
    }));
  } catch (error) {
    console.error('Error fetching brokers:', error);
    return [];
  }
}