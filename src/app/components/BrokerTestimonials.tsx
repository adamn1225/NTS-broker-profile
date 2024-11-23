import React, { useState, useEffect } from 'react';
import supabase from '../../../lib/supabaseClient';
import StarRating from './StarRating';

interface Testimonial {
    id: string;
    name: string;
    rating: number;
    description: string;
}

const BrokerTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [name, setName] = useState('');
    const [rating, setRating] = useState(1);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const { data, error } = await supabase.from('testimonials').select('*');
        if (error) {
            console.error('Error fetching testimonials:', error);
        } else {
            setTestimonials(data);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await supabase.from('testimonials').insert([{ name, rating, description }]);
        if (error) {
            console.error('Error submitting testimonial:', error);
        } else {
            if (data) {
                setTestimonials([...testimonials, ...data]);
            }
            setName('');
            setRating(4);
            setDescription('');
        }
    };

    return (
        <div className='px-6 py-9 bg-zinc-950 text-white rounded-lg shadow-md flex flex-col'>
            <h2 className="text-4xl font-bold mb-4 text-secondary-y text-center tracking-tight">Submit a Review</h2>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="xxs:w-2/3 space-y-4 md:w-1/2">
                    <div>
                        <label className="block text-secondary-y font-bold mb-1">How was my service? <br /> select a rating:</label>
                        <StarRating rating={rating} setRating={setRating} />
                    </div>
                    <div>
                        <label className="block text-secondary-y font-bold mb-1">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-y"
                        />
                    </div>
                    <div>
                        <label className="block text-secondary-y font-bold mb-1">Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-y"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-secondary-y text-zinc-900 font-bold rounded-md hover:bg-secondary-y-dark focus:outline-none focus:ring-2 focus:ring-secondary-y"
                    >
                        Submit
                    </button>
                </form>
            </div>
            {testimonials.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-secondary-y text-center">Testimonials</h2>
                    <ul className="space-y-4">
                        {testimonials.map((testimonial) => (
                            <li key={testimonial.id} className="p-4 bg-zinc-800 rounded-md shadow-md">
                                <h3 className="text-xl font-bold text-secondary-y">{testimonial.name}</h3>
                                <p className="text-secondary-y">Rating: {testimonial.rating} Stars</p>
                                <p>{testimonial.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BrokerTestimonials;