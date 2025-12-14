const express = require('express');
const cors = require('cors');
require('dotenv').config();
const portfolioData = require('./data');
const { Resend } = require('resend');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// REQUIRED for Render
app.set('trust proxy', 1);

const allowedOrigins = [
    'http://localhost:5173',
    'https://portfolio-tau-gilt-iuv15o2twm.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST'],
}));

app.use(express.json());

// Rate limiter
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    statusCode: 429,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------- API ENDPOINTS ----------------
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

    console.log(`[DEBUG] Attempting to send email via Resend...`);
    console.log(`[DEBUG] TO_EMAIL: '${process.env.TO_EMAIL}'`);
    console.log(`[DEBUG] RESEND_API_KEY Available: ${!!process.env.RESEND_API_KEY}`);

    try {
        // 1️⃣ Send notification to you
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: process.env.TO_EMAIL,
            replyTo: email,
            subject: `Portfolio Contact: ${name}`,
            text: `Name: ${name}
Email: ${email}

Message:
${message}`
        });

        // 2️⃣ Auto-reply to sender (non-blocking)
        resend.emails.send({
            from: 'Sharath <onboarding@resend.dev>',
            to: email,
            subject: 'Thanks for contacting!',
            text: `Hi ${name},

Thanks for reaching out through my portfolio.
I’ve received your message and will get back to you shortly.

Best regards,
Sharath`
        }).catch(() => {});

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
