// ContactPage.jsx
import React, { useState } from 'react';
import './ContactPage.css';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="contact-page">

            <header className="contact-header">
            <div className="contact-text">
                <h1>NarratoZone</h1>
                <p>Let's Start a Conversation</p>
            </div>
            </header>

            <div className="contact-container">
                <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <div className="info-box">
                        <div className="info-item">
                            <h3>Email</h3>
                            <p>contact@narratozone.com</p>
                        </div>
                        <div className="info-item">
                            <h3>Location</h3>
                            <p>123 Story Street, Creative City, ST 12345</p>
                        </div>
                        <div className="info-item">
                            <h3>Follow Us</h3>
                            <div className="social-links" >
                                <a href="#">X</a>
                                <a href="#">In</a>
                                <a href="#">fb</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <h2>Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;