
import React from 'react'
import { FaHandPointRight } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa";
import { GiArrowDunk } from "react-icons/gi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FaAnglesUp } from "react-icons/fa6";

function BrokerTestimonials() {
    return (
        <article className='xxs:px-0 bg-stone-950 py-12 md:px-12'>
            <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>

                <div className='flex text-stone-100 text-center mx-12 flex-col gap-2  md:px-12'>
                    <h3 className='text-3xl text-stone-100 text-center font-bold font-mono tracking-wider md:mx-12'>CLIENTS SAY</h3>
                    <div className='my-2 md:mx-24' style={{ border: 'solid', borderColor: '#b18c2f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px'}}></div>
                    <h3 className='text-stone-100 font-semibold'>Joyce M.</h3>
                    <p className='text-stone-100 font-semibold md:px-12'>Hey, my experience has been great!! It’s been a smooth transport. They have transported 5 of our cars and there’s  no hidden fees.
                              We received our cars fast with great communication!!
                             I would recommend this company to anyone who ask. Thank you again for such great service</p>
                </div>

            </div>
        </article>
    )
}

export default BrokerTestimonials
