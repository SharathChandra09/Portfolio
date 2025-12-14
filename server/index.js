const express = require('express');
const cors = require('cors');
const portfolioData = require('./data');
require('dotenv').config();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://portfolio-tau-gilt-iuv15o2twm.vercel.app"
    ],
    methods: ["GET", "POST"]
}));

app.use(express.json());

// ---------------- RATE LIMITER ----------------
// 5 requests per 15 minutes per IP
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    statusCode: 429,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

// ---------------- MAIL TRANSPORTER ----------------
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s+/g, '')
    }
});

// ---------------- API ENDPOINTS ----------------
app.get('/api/portfolio', (req, res) => {
    res.json(portfolioData);
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    const { name, email, message } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // 2️⃣ Email format validation (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email address"
        });
    }

    // 3️⃣ Notification email (to you)
    const notificationOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.TO_EMAIL,
        subject: `Portfolio Contact: ${name}`,
        text: `You have a new message from your portfolio!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
    };

    // 4️⃣ Auto-reply email (to user)
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
        // Send notification email
        await transporter.sendMail(notificationOptions);

        // Send auto-reply (non-blocking)
        try {
            await transporter.sendMail(autoReplyOptions);
        } catch (autoError) {
            console.error("Auto-reply failed:", autoError.message);
        }

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
    console.log(`Server running on http://localhost:${PORT}`);
});
