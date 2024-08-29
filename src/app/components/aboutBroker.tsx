import React from 'react'
import { FaHandPointRight } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa";
import { GiArrowDunk } from "react-icons/gi";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

interface Props {}

function AboutBroker(props: Props) {
    const {} = props

    return (
        <>
        <article className='bg-stone-950 py-12'>
            <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                <div className='flex flex-col gap-2'>
                        
                <GiArrowDunk style={{ color: '#00ffff', width: '80px', height: 'auto', position: 'relative', left: '50' }} />
                 <img className='w-52 h-auto self-center' src="/profile-bg-removed.png" alt="" />
                        <h3 className='text-3xl text-center font-bold font-robotoSlab tracking-wider'>MEET NOAH</h3>
                        <div className='my-2' style={{ border: 'solid', borderColor: '#00ffff', borderRight: 'none', borderLeft: 'none', borderWidth: '1px'}}></div>
                    <ul className='px-2 flex flex-col items-center justify-center gap-2'>
    <li className='flex gap-1 text-md font-semibold'><FaCheckDouble style={{ color: '#00ffff' }} />Over 10 years experience in logistics </li>
    <li className='flex gap-1 text-md font-semibold'><FaCheckDouble style={{ color: '#00ffff' }} />Handles all freight types/sizes</li>
    <li className='flex gap-1 text-md font-semibold'><FaCheckDouble style={{ color: '#00ffff' }} />Knowledgable - problem solver</li>
    <li></li>
        </ul>
                </div>
                 <div className='text-center text-xl p-3 pt-8 md:text-3xl flex flex-row font-bold md:w-1/2 h-full'>
                        <div className='flex justify-start items-start md:mr-2'>    <FaQuoteLeft style={{ color: '#00ffff' }} /> </div>
                        <p>When starting at NTS I always told everyone how eventually this company is going to be the top of it's industry, and the tremendous amount of growth that this company has shown in such a short period of time has made me trust my instincts 10 folds. </p><br />
                        
                        <div className='flex justify-end items-end'><FaQuoteRight style={{ color: '#00ffff' }} /></div>
                </div>
            </div>
        </article>
        </>
    )
}

export default AboutBroker
