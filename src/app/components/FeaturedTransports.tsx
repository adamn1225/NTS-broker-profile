"use client";

import React from 'react';
import LazyLoad from 'react-lazyload';
import { ClipLoader } from 'react-spinners';

interface Props {}

const FeaturedTransports = (props: Props) => {
    const {} = props;

    return (
        <article className='flex flex-col text-center bg-stone-100 mt-1 px-2 md:px-28 py-6 mb-4'>
            <h1 className='text-zinc-800 text-4xl font-mono font-semibold mb-6 tracking-wider'>RECENT TRANSPORTS</h1>
            <div className='grid md:grid-cols-4 gap-3 md:gap-12 items-center'>
                {[
                    {
                        src: 'https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg',
                        title: "Rectangle 20' Wide Plastic Pool Plus Two Modules",
                        route: 'Rozet, WY to Baltimore, MD',
                        specs: ['Length: 45 ft', 'Width: 20 ft', 'Height: 10 ft', 'Weight: 30,000 lbs']
                    },
                    {
                        src: 'https://ntslogistics.com/wp-content/uploads/2023/05/Komatsu-D61PX-12-Crawler-Tractor.png',
                        title: 'BOKEELIA, FL to PORTSMOUTH, VA',
                        route: 'HARVEY, LA to INDIANTOWN, FL',
                        specs: ['Length: 36.75 ft', 'Width: 11.10 ft', 'Height: 11.92 ft', 'Weight: 79,700 lbs']
                    },
                    {
                        src: 'https://ntslogistics.com/wp-content/uploads/2023/05/Caterpillar-PM565B-Cold-Planer.png',
                        title: 'Caterpillar PM565B Cold Planer',
                        route: 'FAIRFIELD, NJ to BAKERSFIELD, CA',
                        specs: ['Length: 47.58 ft', 'Width: 10.34 ft', 'Height: 10.50 ft', 'Weight: 83,776 lbs']
                    },
                    {
                        src: './chamber-crane.jpeg',
                        title: '110k lb. Combustion Chamber',
                        route: 'GREEN BAY, WI to CHANDLER, AZ',
                        specs: ['Length: 53 ft', 'Width: 13.3 ft', 'Height: 13.75 ft', 'Weight: 110,276 lbs']
                    }
                ].map((item, index) => (
                    <div key={index} className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
                        <LazyLoad height={320} offset={100} placeholder={<ClipLoader color="#ffffff" />}>
                            <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src={item.src} alt={item.title} />
                        </LazyLoad>
                        <h1 className='text-stone-100 text-xl font-semibold'>{item.title}</h1>
                        <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
                        <h2 className='text-stone-100 text-lg'>{item.route}</h2>
                        <ul className='text-stone-100 text-md'>
                            {item.specs.map((spec, i) => (
                                <li key={i}>{spec}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </article>
    );
};

export default FeaturedTransports;