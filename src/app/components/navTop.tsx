"use client";

import Link from "next/link";
import { Navbar, Button } from "flowbite-react";

export default function NavTop() {
  return (
    <Navbar fluid rounded className="px-24 bg-[url('https://www.heavyhaulers.com/nav-bg-new.png')]">
      <>
        <Navbar.Brand as={Link} href="https://www.heavyhaulers.com/">
          <img src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png" className="mr-3 h-6 sm:h-9" alt="Heavy Haulers Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <div className="flex flex-row justify-center items-center gap-4">
            <Navbar.Link href="#" className="text-lg font-bold navbar-link-hover">My Company Profile</Navbar.Link>
            <Navbar.Link href="#" className="text-lg font-bold navbar-link-hover">Contact</Navbar.Link>
            <Button className="bg-button hover:bg-slate-800 hover:text-mute-200" href="#">Login</Button>
          </div>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
}