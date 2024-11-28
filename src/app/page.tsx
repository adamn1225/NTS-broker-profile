"use client";
import React from 'react';
import LazyLoad from 'react-lazyload';
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
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <Hero />
        </LazyLoad>
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <AboutBroker />
        </LazyLoad>
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <DimensionSearchForm />
        </LazyLoad>
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <FeaturedTransports />
        </LazyLoad>
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <BrokerTestimonials />
        </LazyLoad>
        <LazyLoad height={200} offset={100} placeholder={<div>Loading...</div>}>
          <CreditApp />
        </LazyLoad>
        <ScrollToTopButton />
      </section>
    </>
  );
}