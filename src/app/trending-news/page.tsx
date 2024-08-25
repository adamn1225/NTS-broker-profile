"use client";
import '../globals.css';
import React, { useState, useEffect } from 'react';
import fetchNews from '../api/newsapi.js';

interface NewsArticle {
  title: string;
  snippet: string;
  url: string;
  image?: string;
}

const ConstructionNews: React.FC = () => {
  const [data, setData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchNews();
        console.log('Fetched data:', response); // Log the fetched data
        setData(response.data); // Adjust according to the actual response structure
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="md:px-20 px-4 pb-12 bg-stone-100">
      <h1 className="text-stone-800 text-center font-bold text-4xl mb-2 pt-12">Construction News</h1>
      <div className="border border-stone-800/80 my-3 md:mx-80 flex items-center justify-center"> </div>
      <ul className="flex flex-wrap w-full justify-items-center md:mx-72 items-stretch gap-2">
        {data.map((article, index) => (
          <li className="border flex flex-col justify-center w-1/3 p-4 border-stone-800 h-full min-h-[200px] shadow-xl" key={index}>
            <h2 className="text-justify font-semibold">{article.title}</h2>
            {article.image ? (
              <img src={article.image} alt={article.title} />
            ) : (
              <div>No image available</div> // Placeholder or icon
            )}
            <p className="text-justify font-light">{article.snippet}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConstructionNews;