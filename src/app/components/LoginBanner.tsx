"use client";

import { Banner, Button } from "flowbite-react";
import { HiX } from "react-icons/hi";

function LoginBanner() {
  return (
    <Banner>
      <div className="flex w-screen flex-col justify-center rounded-lg border border-mute-200 bg-gray-900/90 p-4 shadow-sm md:flex-row">
        <div className="mb-3 mr-4 flex flex-col items-start md:mb-0 md:flex-row md:items-center">
          <a
            href="https://www.heavyhaulers.com/"
            className="mb-2 flex items-center border-gray-200 dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4"
          >
            <img src="https://www.heavyhaulers.com/images/iconheavyhaul.ico" className="mr-2 h-16 drop-shadow-2xl" alt="HH Logo" />
            <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white md:pr-6">
              
            </span>
          </a>
          <p className="flex items-center text-sm font-bold text-mute-200 dark:text-gray-400">
            Create a free account - Get rate history, documents, updates and more.
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <Button className="bg-button hover:bg-amber-400 hover:text-mute-200" href="#">Create an Account</Button>
          <Banner.CollapseButton className="banner-collapse-button border-0 bg-transparent text-mute-200">
            <HiX className="h-4 w-4" />
          </Banner.CollapseButton>
        </div>
      </div>
    </Banner>
  );
}

export default LoginBanner;