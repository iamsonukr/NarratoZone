// BlogIdeaGenerator.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './BlogIdeaGenerator.css';
import Header from '../../components/Header/Header';

function BlogIdeaGenerator() {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/idea/chatgpt', { topic });
      setIdeas(response.data.ideas);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="blog-generator">
        <h1>Blog Idea Generator</h1>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your topic..."
            disabled={loading}
            className="input-field"
          />
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Generating...' : 'Generate Ideas'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {ideas && (
          <div className="ideas-container">
            <h2>Generated Ideas:</h2>
            <div className="ideas-content">
              {ideas}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BlogIdeaGenerator;