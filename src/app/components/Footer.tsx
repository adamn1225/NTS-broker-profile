"use client";
import { Footer } from "flowbite-react";

<Footer container className="bg-[url('https://www.heavyhaulers.com/nav-bg-new.png')]">
<div className="w-full text-center">
  <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
    <Footer.Brand
      href="https://heavyhaulers.com"
      src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png"
      alt="Heavy Haulers Logo"
    />
    <Footer.LinkGroup>
      <Footer.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">Blog</Footer.Link>
      <Footer.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">Portfolio</Footer.Link>
      <Footer.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">NTS Profile</Footer.Link>
      <Footer.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="#">LinkedIn</Footer.Link>
      <Footer.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:pr-4" href="#">GitHub</Footer.Link>
    </Footer.LinkGroup>
  </div>
  <Footer.Divider />
  <Footer.Copyright by="SSTA" year={2024} />
</div>
</Footer>