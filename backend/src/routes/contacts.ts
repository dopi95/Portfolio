import express from 'express';
import Contact from '../models/Contact';
import jwt from 'jsonwebtoken';
import { sendTelegramNotification } from '../services/telegramService';
import axios from 'axios';

const router = express.Router();

// Middleware to verify token
const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log('Contact form received:', { name, email, phone, message });
    const cleanPhone = phone && typeof phone === 'string' && phone.replace(/[^0-9]/g, '').length >= 7 ? phone.trim() : undefined;

    const contact = new Contact({ name, email, phone: cleanPhone, message });
    await contact.save();

    await sendTelegramNotification(name, email, cleanPhone, message);

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
});

// Get all contacts (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Mark as read (protected)
router.put('/:id/read', verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact' });
  }
});

// Reply to contact (protected)
router.post('/:id/reply', verifyToken, async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Send email reply using Brevo
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { name: 'Elyas Yenealem (Software Developer)', email: 'portfolio9594@gmail.com' },
        to: [{ email: contact.email, name: contact.name }],
        subject: 'Re: Your Message',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f97316;">Thank you for contacting us!</h2>
            <p>Hi ${contact.name},</p>
            <p>${replyMessage}</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">Your original message:</p>
            <p style="color: #6b7280; font-size: 12px; font-style: italic;">${contact.message}</p>
          </div>
        `
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      }
    );

    // Update contact
    contact.replied = true;
    contact.replyMessage = replyMessage;
    contact.repliedAt = new Date();
    await contact.save();

    res.json({ message: 'Reply sent successfully', contact });
  } catch (error) {
    console.error('Error sending reply:', error);
    res.status(500).json({ message: 'Error sending reply' });
  }
});

// Delete contact (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

export default router;
