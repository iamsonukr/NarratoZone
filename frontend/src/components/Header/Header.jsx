import React, { useState, useEffect } from 'react';
import './Header.css';
import { img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12 } from '../../assets/assets.js';

const Header = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set a random image index on component mount
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);
  }, []); // Empty dependency array ensures this runs only once on reload

  return (
    <div
      className="head-image"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '90vh', // Adjust height as per your design
      }}
    >
      <h1>
        <span className="head-text">"Creativity is intelligence having fun."</span> <br />
        <span className="quote-author">– Albert Einstein</span>
      </h1>
    </div>
  );
};

export default Header;
