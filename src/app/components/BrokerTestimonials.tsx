"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubmitReview from './SubmitReview';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Review {
    name: string;
    text: string;
    imageUrl?: string;
    companyName?: string;
    jobTitle?: string;
}

function BrokerTestimonials() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const apiUrl = '/.netlify/functions/get-reviews';

            try {
                const response = await axios.get(apiUrl);
                console.log('Fetched reviews:', response.data); // Debugging log
                setReviews(response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error fetching reviews:', error.message);
                    console.error('Error response data:', error.response?.data);
                    console.error('Error response status:', error.response?.status);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };

        fetchReviews();
    }, []);

    const addReview = (name: string, text: string, imageUrl: string, companyName: string, jobTitle: string) => {
        console.log('Adding review:', { name, text, imageUrl, companyName, jobTitle }); // Debugging log
        setReviews([...reviews, { name, text, imageUrl, companyName, jobTitle }]);
    };

    const placeholderImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_25mGTjpQRpmjZPskWmuGCp3oLOh2XvErRA&s'; // Placeholder image URL

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1, // Show only one slide at a time
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    console.log('Slider settings:', settings); // Debugging log
    console.log('Number of reviews:', reviews.length); // Debugging log

    return (
        <article className='xxs:px-0 bg-stone-950 py-12 md:px-12 mb-4'>
            <div className='text-mute-950'>
                <div className='text-stone-100 text-center mx-12 gap-2 md:px-12'>
                    <h3 className='text-3xl text-stone-100 text-center font-bold font-mono tracking-wider md:mx-12'>CLIENTS SAY</h3>
                    <div className='my-2 md:mx-24' style={{ border: 'solid', borderColor: '#b18c2f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div>
                    <Slider {...settings}>
                        {reviews.map((review, index) => (
                            <div key={index} className='flex flex-row items-center'>
                                <div className='flex flex-col items-center'>
                                    <img
                                        src={review.imageUrl || placeholderImageUrl}
                                        alt={`${review.name}'s review`}
                                        className='mt-4 w-36 mb-4 h-auto rounded-full border border-white drop-shadow-lg'
                                    />
                                    <h3 className='text-stone-100 text-lg font-semibold'>{review.name}</h3>
                                    <p className='text-stone-100 text-lg pb-4 font-bold underline'>{review.jobTitle} at {review.companyName}</p>
                                    <p className='text-stone-100 font-semibold md:px-12'>{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            <span className='hidden'><SubmitReview addReview={addReview} /></span>
        </article>
    );
}

export default BrokerTestimonials;