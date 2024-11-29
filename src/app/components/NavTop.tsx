"use client";
import React, { useEffect, useState } from 'react';
import { MdEmail, MdPermPhoneMsg } from 'react-icons/md';
import { FaArrowsAltH as MoveHorizontal } from 'react-icons/fa';
import Link from 'next/link';

const NavTop = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (

      <nav className="md:px-24 py-2 w-full bg-zinc-900">
        <div className="flex flex-col md:flex-row justify-center px-2 w-full items-center md:justify-between md:items-center">
          <Link href="/" legacyBehavior>
            <a>
              <span className='flex mt-5 lg:mt-2 2xl:mt-0 items-center justify-center font-bold  flex-nowrap'>
                <h2 className='text-lg md:mt-0 self-center font-extrabold tracking-tighter flex gap-0.5'>
                  SHIPPING<MoveHorizontal className='size-6 text-orange-500' />
                  CONNECT
                </h2>
              </span>
              <span className='text-xs md:text-base font-bold text-center text-orange-500'>A Division of NTS Logistics</span>
            </a>
          </Link>

          <div className="text-center flex flex-col gap-2 md:flex-row md:items-center justify-center h-20 md:h-auto pb-5 md:pb-0 min-h-min">
            {isClient && (
              <>
                <Link href="https://shipper-connect.com/signup" legacyBehavior>
                <a className="px-3 py-1 rounded-sm bg-secondary-y text-zinc-900 text-lg hover:bg-orange-400/90 transition-colors duration-300 hover:underline underline-offset-4 font-bold">
                    Sign Up
                  </a>
                </Link>
                <Link href="https://shipper-connect.com/user/client-login" legacyBehavior>
                <a className="px-3 py-1 rounded-sm bg-secondary-y text-zinc-900 text-lg hover:bg-orange-400/90 transition-colors duration-300 hover:underline underline-offset-4 font-bold">
                    Login
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
  );
};

export default NavTop;