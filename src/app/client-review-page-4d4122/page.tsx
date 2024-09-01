"use client";
import '../globals.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitReview from '@components/SubmitReview';
import { FaAnglesDown } from "react-icons/fa6";

interface Review {
    name: string;
    text: string;
    imageUrl?: string;
}

function Page() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const apiUrl = process.env.NODE_ENV === 'development'
                ? '/.netlify/functions/get-reviews'
                : '/.netlify/functions/get-reviews';

            try {
                const response = await axios.get(apiUrl);
                console.log('Fetched reviews:', response.data); // Debugging log
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const addReview = (name: string, text: string, imageUrl: string) => {
        console.log('Adding review:', { name, text, imageUrl }); // Debugging log
        setReviews([...reviews, { name, text, imageUrl }]);
    };

    const placeholderImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_25mGTjpQRpmjZPskWmuGCp3oLOh2XvErRA&s'; // Placeholder image URL

    return (
<>
            <div className="my-12"><SubmitReview addReview={addReview} /></div>

            <h3 className='text-xl flex gap-2 items-center justify-center italic text-stone-950 text-center font-bold font-mono tracking-wider md:mx-12'><FaAnglesDown className='xxs:h-6' style={{ color: '#000', }} />Example of a review displayed<FaAnglesDown className='xxs:h-6' style={{ color: '#000', }} /></h3>

            <div className='w-full flex justify-center items center'><div className='w-1/4 my-2 mx-24 px-1 md:mx-96 mb-12' style={{ border: 'solid', borderColor: '#000', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div></div>
            <article className='xxs:px-0 bg-stone-950 py-12 my-12 md:px-12'>
                <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                    <div className='flex text-stone-100 text-center mx-12 flex-col gap-2 md:px-12'>


                        <h3 className='text-3xl text-stone-100 text-center font-bold font-mono tracking-wider md:mx-12'>CLIENTS SAY</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {reviews.map((review, index) => (
                                <div className='flex flex-col items-center' key={index}>
                                    <img
                                        src={review.imageUrl || placeholderImageUrl}
                                        alt={`${review.name}'s review`}
                                        className='mt-4 w-36 mb-4 h-auto rounded-full border border-secondary-y drop-shadow-lg'
                                    />
                                    <h3 className='text-stone-100 text-xl font-semibold'>{review.name}</h3>
                                    <div className='my-2 px-10 pt-0 border border-secondary-y ' ></div>
                                    <p className='text-stone-100 font-semibold md:px-12'>{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </article>
                
</>
    );
}

export default Page;