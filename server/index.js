const express = require('express');
const cors = require('cors');
const portfolioData = require('./data');
require('dotenv').config();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;


app.set('trust proxy', 1);

const allowedOrigins = [
    'http://localhost:5173',
    'https://portfolio-tau-gilt-iuv15o2twm.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests without origin (Postman, curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
}));

app.use(express.json());

/**
 * ✅ RATE LIMITER
 */
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    statusCode: 429,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

/**
 * ✅ SMTP CONFIG (FIXES ETIMEDOUT)
 * Do NOT use `service: 'gmail'` on Render
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, '')
    }
});

/**
 * ---------------- API ENDPOINTS ----------------
 */
app.get('/api/portfolio', (req, res) => {
    res.json(portfolioData);
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address"
        });
    }

    const notificationOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: `Portfolio Contact: ${name}`,
        text: `You have a new message from your portfolio!

Name: ${name}
Email: ${email}

Message:
${message}`,
        replyTo: email
    };

    const autoReplyOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thanks for contacting!",
        text: `Hi ${name},

Thank you for reaching out through my portfolio.
I’ve received your message and will get back to you shortly.

Best regards,
Sharath Chandra`
    };

    try {
        // 🔴 Blocking – must succeed
        await transporter.sendMail(notificationOptions);

        // 🟢 Non-blocking – optional
        transporter.sendMail(autoReplyOptions)
            .catch(err => console.error("Auto-reply failed:", err.message));

        res.status(200).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again later."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
