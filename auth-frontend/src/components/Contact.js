import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSubmitStatus({ success: true, message: 'Thank you for your message!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitStatus({ 
        success: false, 
        message: err.response?.data?.message || 'Failed to send message. Please check your inputs and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions? We're here to help!</p>
      </div>

      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          {submitStatus && (
            <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
              title="10-digit phone number (e.g., 0123456789)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              minLength="10"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <div className="info-item">
            <i className="fas fa-envelope"></i>
            <span>info@bloodcare.org</span>
          </div>
          <div className="info-item">
            <i className="fas fa-phone"></i>
            <span>+977-1-1234567</span>
          </div>
          <div className="info-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>Kathmandu, Nepal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;