"use client";
import Link from "next/link";
import { FaLinkedin, FaLink } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

export default function PageFooter() {
  return (
    <footer className="bg-stone-950 footer rounded-none p-6">
      <div className="w-full text-start">
        <h2 className="md:text-start text-center underline underline-offset-4 md:mb-0 font-bold tracking-tighter text-3xl text-mute-200 mb-7">NTS BRANDS</h2>
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <div className="flex md:flex-row flex-col items-center gap-1 md:gap-2">
            <Link href="https://www.heavyhaulers.com" legacyBehavior>
              <a className="flex items-center">
                <img src="https://www.heavyhaulers.com/images/hh-label-icons/hh-verticle-logo-final.png" alt="Heavy Haulers Logo" className="h-10" />
              </a>
            </Link>
            <Link href="https://heavyequipmenttransport.com/" legacyBehavior>
              <a className="flex items-center">
                <img src="https://heavyequipmenttransport.com/images/logo.png" alt="Heavy Haulers Logo" className="h-10" />
              </a>
            </Link>
            <Link href="https://www.tractortransport.com/" legacyBehavior>
              <a className="flex items-center">
                <img src="https://www.tractortransport.com/images/tractor-transport-transparent-logo.png" alt="Heavy Haulers Logo" className="h-10" />
              </a>
            </Link>
            <div className="md:hidden block w-full border-t border-gray-700 my-4"></div>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex flex-col items-center justify-center">
              <Link href="https://ntslogistics.com/team/adam-noah/" legacyBehavior>
                <a className="text-3xl text-center footer-links m-0 font-bold navbar-link-hover no-underline text-secondary-y flex items-center justify-center gap-2">
                    <FaLink className="h-5 w-5" />
                    NTS PROFILE
                
                </a>
              </Link>
              <span className="w-full border border-y-1 border-x-1 border-secondary-y md:mr-4"> </span>
            </div>
            <div className="flex gap-2 mt-2">
              <Link href="https://www.linkedin.com/in/adam-m-noah/" legacyBehavior>
                <a className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:mr-4 md:border-r md:pr-4">
                  <FaLinkedin className="h-16 w-16 text-secondary-y" />
                </a>
              </Link>
              <Link href="https://github.com/adamn1225" legacyBehavior>
                <a className="text-lg footer-links font-bold navbar-link-hover border-gray-200 md:mb-0 md:pr-4">
                  <FaSquareGithub className="h-16 w-16 text-secondary-y" />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-gray-700 my-4"></div>
        <div className="flex md:flex-row flex-col md:justify-center md:mb-2 justify-stretch w-full items-center">
          {/* <a href="/login" className="md:bg-stone-800 footer-button md:w-1/6 w-full text-gray-300 hover:bg-stone-700 hover:text-mute-200">
            Broker Login/Register
          </a> */}
        </div>

        <div className="text-center text-gray-400">
          &copy; 2024 SSTA & NTS Logistics LLC
        </div>
      </div>
    </footer>
  );
}