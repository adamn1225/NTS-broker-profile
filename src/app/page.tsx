"use client";
import React from 'react';
import './globals.css';
import AboutShippingConnect from './components/AboutShippingConnect';
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
        <AboutShippingConnect />
        <CreditApp />
        <FeaturedTransports />
        <DimensionSearchForm />

       

        <ScrollToTopButton />
      </section>
    </>
  );
}