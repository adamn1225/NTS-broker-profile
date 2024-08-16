"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";

export default function NavTop() {
  return (
    <Navbar fluid rounded className="px-12 bg-[url('https://www.heavyhaulers.com/nav-bg-new.png')]">

        <Navbar.Brand as={Link} href="https://www.heavyhaulers.com/">
          <img src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png" className="mr-3 h-6 sm:h-9" alt="Heavy Haulers Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#" className="text-lg font-bold text-slate-700">My Company Profile</Navbar.Link>
          <Navbar.Link href="#" className="text-lg font-bold text-slate-700">Contact</Navbar.Link>
        </Navbar.Collapse>

    </Navbar>
  );
}