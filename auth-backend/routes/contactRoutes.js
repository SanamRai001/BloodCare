const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

    await newContact.save();
    res.status(201).json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    console.error('Error submitting contact form:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contacts (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;