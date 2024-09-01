"use client";
import Link from "next/link";
import { Navbar, Button } from "flowbite-react";
import { Footer } from "flowbite-react";
import BrokerRegister from '../login/brokerRegister';
import { FaLinkedin, FaLink } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

export default function PageFooter() {
  return (
    <Footer container className="bg-stone-950 footer rounded-none">
  <div className="w-full text-start">
        <h2 className="md:text-start text-center underline underline-offset-4 md:mb-0 font-light text-3xl text-mute-200 mb-7">NTS BRANDS</h2>
    <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
      <div className="flex md:flex-row flex-col items-center md:gap-2">
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
            <Footer.Divider className="md:hidden block"/>
      </div>
          
      <Footer.LinkGroup className="flex flex-col justify-center items-center gap-2">
           <div className="flex flex-col items-center justify-center">
            <Footer.Link className="text-3xl text-center footer-links m-0 font-bold navbar-link-hover no-underline" href="https://ntslogistics.com/team/adam-noah/"><span className="text-secondary-y flex items-center justify-center gap-2"><FaLink className="h-5 w-5"/>NTS PROFILE</span></Footer.Link>
            <span className="w-full border border-y-1 border-x-1 border-secondary-y md:mr-4"> </span>
            </div>
<div className="flex gap-2 mt-2">
              <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4" href="https://www.linkedin.com/in/adam-m-noah/"><FaLinkedin className="h-16 w-16 text-secondary-y"/> </Footer.Link>
              <Footer.Link className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:pr-4" href="https://github.com/adamn1225"><FaSquareGithub className="h-16 w-16 text-secondary-y"/></Footer.Link>
</div>
      </Footer.LinkGroup>
    </div>
    <Footer.Divider />
    <div className=" flex md:flex-row flex-col md:justify-center md:mb-2 justify-stretch w-full items-center">
      <Button href="/login" className="md:bg-stone-800 footer-button md:w-1/6 w-full text-gray-300 hover:bg-stone-700 hover:text-mute-200">Broker Login/Register</Button>
    </div>
    
    <Footer.Copyright className="text-center" by="SSTA & NTS Logistics LLC" year={2024} />
  </div>
</Footer>
)};