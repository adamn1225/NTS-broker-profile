"use client";

import React from 'react'

interface Props {}

const FeaturedTransports = (props: Props) => {
    const {} = props

    return (
        <article className='flex flex-col text-center bg-stone-100 mt-1 px-2 md:px-28 py-6 mb-4'>
            
            <h1 className='text-slate-800 text-4xl font-mono font-semibold mb-6 tracking-wider'>RECENT TRANSPORTS</h1>
            <div className='grid md:grid-cols-4 gap-3 md:gap-12 items-center'>
                <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
                    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg' />
                    <h1 className='text-stone-100 text-xl font-semibold'>Rectangle 20' Wide Plastic Pool Plus Two Modules</h1>
                    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
                    <h2 className='text-stone-100 text-lg'>Rozet, WY to Baltimore, MD</h2>
                    <ul className='text-stone-100 text-md'>
                        <li>Length: 45 ft</li>
                        <li>Width: 20 ft</li>
                        <li>Height: 10 ft</li>
                        <li>Weight: 30,000 lbs</li>
                    </ul>
                </div>
                <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
                    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/Komatsu-D61PX-12-Crawler-Tractor.png' />
                    <h1 className='text-stone-100 text-xl font-semibold'>BOKEELIA, FL to PORTSMOUTH, VA</h1>
                    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
                    <h2 className='text-stone-100 text-lg'>HARVEY, LA to INDIANTOWN, FL</h2>
                    <ul className='text-stone-100 text-md'>
                        <li>Length: 36'75 ft</li>
                        <li>Width: 11.10 ft</li>
                        <li>Height: 11.92 ft</li>
                        <li>Weight: 79,700 lbs</li>
                    </ul>
                </div>
                <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
                    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/Caterpillar-PM565B-Cold-Planer.png' />
                    <h1 className='text-stone-100 text-xl font-semibold'>Caterpillar PM565B Cold Planer</h1>
                    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
                    <h2 className='text-stone-100 text-md'>FAIRFIELD, NJ to BAKERSFIELD, CA</h2>
                    <ul className='text-stone-100 text-md'>
                        <li>Length: 47'58 ft</li>
                        <li>Width: 10'34 ft</li>
                        <li>Height: 10'50 ft</li>
                        <li>Weight: 83,776 lbs</li>
                    </ul>
                </div>

                <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
                    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='./chamber-crane.jpeg' />
                    <h1 className='text-stone-100 text-xl font-semibold'>110k lb. Combustion Chamber</h1>
                    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
                    <h2 className='text-stone-100 text-md'>GREEN BAY, WI to CHANDLER, AZ</h2>
                    <ul className='text-stone-100 text-md'>
                        <li>Length: 53' ft</li>
                        <li>Width: 13.3' ft</li>
                        <li>Height: 13.75' ft</li>
                        <li>Weight: 110,276 lbs</li>
                    </ul>
                </div>

            </div>
        </article>
    )
}

export default FeaturedTransports
