"use client";
import Link from "next/link";
import { Navbar, Button } from "flowbite-react";
import { Footer } from "flowbite-react";

export default function PageFooter() {
  return (
<Footer container className="bg-gray-800 footer">
  <div className="w-full text-start">
    <h2 className="text-start font-bold text-3xl text-mute-200 mb-2">OUR BRANDS</h2>
    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
      <div className="flex gap-2">
        <Footer.Brand
          href="https://www.heavyhaulers.com"
          src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png"
          alt="Heavy Haulers Logo"
        />    
        <Footer.Brand
          href="https://heavyequipmenttransport.com/"
          src="https://heavyequipmenttransport.com/images/logo.png"
          alt="Heavy Haulers Logo"
        />
        <Footer.Brand
          href="https://www.tractortransport.com/"
          src="https://www.tractortransport.com/images/tractor-transport-transparent-logo.png"
          alt="Heavy Haulers Logo"
        />
      </div>
      <Footer.LinkGroup className="flex flex-wrap">
        <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">Blog</Footer.Link>
        <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">Portfolio</Footer.Link>
        <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">NTS Profile</Footer.Link>
        <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">LinkedIn</Footer.Link>
        <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:pr-4" href="#">GitHub</Footer.Link>
      </Footer.LinkGroup>
    </div>
    <Footer.Divider />
    <div className="w-full">
      <Button href="/login" className="bg-gray-600 w-1/6 text-gray-300 footer-button hover:bg-slate-800 hover:text-mute-200">Admin Login</Button>
    </div>
    <Footer.Copyright by="SSTA & NTS Logistics LLC" year={2024} />
  </div>
</Footer>
)};