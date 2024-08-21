"use client";
import Link from "next/link";
import { Navbar, Button } from "flowbite-react";

export default function NavTop() {
  return (
    <Navbar fluid rounded className="md:px-24 w-full bg-[url('https://www.heavyhaulers.com/nav-bg-new.png')]">
      <>
          <div className="flex flex-col gap-6 justify-center w-full md:flex-row md:justify-between items-center md:gap-4 md:align-middle">
        <Navbar.Brand as={Link} href="#">
          <img src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png" className="mr-3 h-6 sm:h-9" alt="Heavy Haulers Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className=" block text-center md:flex flex-row">
            <Navbar.Link href="#" className="text-lg text-center font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">Portfolio</Navbar.Link>
            <Navbar.Link href="https://ntslogistics.com/team/adam-noah/" className="text-lg text-center font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">My Company Profile</Navbar.Link>
            <Navbar.Link href="tel:1-954-495-8184" className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">954-495-8184</Navbar.Link>
            {/* <Button href="/login" className="bg-button hover:bg-slate-800 hover:text-mute-200">Register</Button> */}
            </div>
        </Navbar.Collapse>
          </div>
      </>
    </Navbar>
  );
}