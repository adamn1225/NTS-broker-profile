"use client";
import './globals.css';
import FreightForms from '@components/FreightForm';
import AboutBroker from './components/aboutBroker';
import ScrollToTopButton from './components/ScrollToTopButton';
import BrokerTestimonials from './components/BrokerTestimonials';
import CreditApp from './components/CreditApp';
import Hero from "@components/Hero";
import FeaturedTransports from './components/FeaturedTransports';

export default function Home() {
  return (

<>
    
  <section className="max-w-max">
        <Hero />
        <AboutBroker />
        <FeaturedTransports />
     <BrokerTestimonials />
        <CreditApp />


    <div className='fixed bottom-10 left-1 w-full items-center my-10 z-50'>
      <ScrollToTopButton />
      </div>
    </section>
    
</>

  );
}
