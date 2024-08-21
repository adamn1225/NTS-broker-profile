import React, { useState } from 'react';

interface CreateArticleFormProps {
    brokerId: string;
}

const CreateArticleForm: React.FC<CreateArticleFormProps> = ({ brokerId }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                broker_id: brokerId,
                image_url: imageUrl,
                title: title,
                content: content,
            }),
        });

        if (response.ok) {
            alert('Article created successfully');
        } else {
            alert('Error creating article');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type="submit">Create Article</button>
        </form>
    );
};

export default CreateArticleForm;