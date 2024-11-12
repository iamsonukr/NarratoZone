import React, { useState } from 'react';
import axios from 'axios';

function BlogIdeaGenerator() {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState('');
    const [loading, setLoading] = useState(false);

    const generateBlogIdeas = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-4",
                    messages: [
                        { role: "system", content: "You are an assistant that provides blog topic ideas." },
                        { role: "user", content: `Generate blog ideas related to: ${topic}` }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIdeas(response.data.choices[0].message.content);
        } catch (error) {
            console.error("Error generating ideas:", error);
            setIdeas("Could not fetch blog ideas. Please try again later.");
        }
        setLoading(false);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Blog Idea Generator</h2>
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic"
                style={{ padding: '10px', width: '300px', fontSize: '16px' }}
            />
            <button onClick={generateBlogIdeas} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
                Generate Ideas
            </button>

            {loading ? (
                <p>Loading ideas...</p>
            ) : (
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <h3>Generated Blog Ideas:</h3>
                    <p>{ideas}</p>
                </div>
            )}
        </div>
    );
}

export default BlogIdeaGenerator;
