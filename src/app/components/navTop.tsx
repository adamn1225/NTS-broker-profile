"use client";
import Link from "next/link";
import { Navbar, Button } from "flowbite-react";

export default function NavTop() {
  return (
    <Navbar fluid rounded className="px-24 bg-[url('https://www.heavyhaulers.com/nav-bg-new.png')]">
      <>
        <Navbar.Brand as={Link} href="#">
          <img src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png" className="mr-3 h-6 sm:h-9" alt="Heavy Haulers Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex flex-row justify-center items-center gap-4">
          <Navbar.Link href="#" className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">Portfolio</Navbar.Link>
            <Navbar.Link href="#" className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">My Company Profile</Navbar.Link>
            <Navbar.Link className="text-lg font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">Contact</Navbar.Link>
            <Button href="/login" className="bg-button hover:bg-slate-800 hover:text-mute-200">Login</Button>
          </div>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
}