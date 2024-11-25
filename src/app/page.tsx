"use client";
import React from 'react';
import './globals.css';
import AboutBroker from './components/aboutBroker';
import ScrollToTopButton from './components/ScrollToTopButton';
import BrokerTestimonials from './components/BrokerTestimonials';
import CreditApp from './components/CreditApp';
import Hero from "@components/Hero";
import FeaturedTransports from './components/FeaturedTransports';
import DimensionSearchForm from './components/DimensionSearchForm';

export default function Home() {
  return (
    <>
      <section className="max-w-max">
        <Hero />
        <AboutBroker />
        <DimensionSearchForm />
        <FeaturedTransports />
        <BrokerTestimonials />
        <CreditApp />

       

        <ScrollToTopButton />
      </section>
    </>
  );
}