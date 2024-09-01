"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface SubmitReviewProps {
    addReview: (name: string, text: string, imageUrl: string, companyName: string, jobTitle: string) => void;
}

const SubmitReview: React.FC<SubmitReviewProps> = ({ addReview }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (file && !allowedTypes.includes(file.type)) {
            alert('Only jpg, jpeg, png, and webp files are allowed');
            setImage(null);
            setFileName(null);
            return;
        }
        setImage(file);
        setFileName(file ? file.name : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:8888/.netlify/functions/add-review' // Adjust this URL if needed
            : '/.netlify/functions/add-review';

        try {
            let imageUrl = '';
            if (image) {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onloadend = async () => {
                    const base64data = reader.result?.toString().split(',')[1];
                    const formData = {
                        file: base64data,
                        fileName: image.name,
                        fileType: image.type,
                    };

                    const uploadResponse = await axios.post('/.netlify/functions/upload-image', formData, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    imageUrl = uploadResponse.data.url;

                    const response = await axios.post(apiUrl, { name, text, imageUrl, companyName, jobTitle });
                    console.log('Response from server:', response.data);
                    addReview(response.data.name, response.data.text, response.data.imageUrl, response.data.companyName, response.data.jobTitle);
                    setName('');
                    setText('');
                    setJobTitle('');
                    setCompanyName('');
                    setImage(null);
                    setFileName(null);
                    setIsSubmitted(true); // Set form as submitted
                };
            } else {
                const response = await axios.post(apiUrl, { name, text, imageUrl, companyName, jobTitle });
                console.log('Response from server:', response.data);
                addReview(response.data.name, response.data.text, response.data.imageUrl, response.data.companyName, response.data.jobTitle);
                setName('');
                setText('');
                setJobTitle('');
                setCompanyName('');
                setImage(null);
                setFileName(null);
                setIsSubmitted(true); // Set form as submitted
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    if (!isClient) {
        return null; // Render nothing on the server
    }

    if (isSubmitted) {
        return <p className='text-slate-950 text-2xl font-semibold text-center'>Thank you for your review!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 mx-4 mt-4 z-50'>
            <h2 className='text-slate-950 text-2xl font-semibold'>Leave Noah a Review</h2>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'
                className='p-2 rounded focus:ring-2 focus:ring-sky-700'
            />
            <input
                type='text'
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder='Your Job Title'
                className='p-2 rounded focus:ring-2 focus:ring-sky-700'
            />
            <input
                type='text'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder='Your Company Name'
                className='p-2 rounded focus:ring-2 focus:ring-sky-700'
            />
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Your Review'
                className='p-2 rounded focus:ring-2 focus:ring-sky-700 w-full md:min-w-96 md:max-w-96 md:min-h-32 min-h-48 max-h-80'
            />
            <button
                type="button"
                onClick={handleButtonClick}
                className='p-2 rounded bg-stone-800 text-white focus:ring-2 focus:ring-sky-700'
            >
                Upload Photo
            </button>
            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                className='hidden'
            />
            {fileName && <p className='text-sm text-gray-600 mt-2'>Selected file: {fileName}</p>}
            <button type='submit' className='px-4 py-2 bg-sky-700 flex gap-2 justify-center items-center text-white font-bold rounded-md shadow-lg z-50'>
                Submit
            </button>
        </form>
    );
};

export default SubmitReview;