const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const core = require('cors')
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST"]
}
app.use(core(corsOptions));
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using Gmail as the email service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'abd828981@gmail.com',
            pass: '' // your password that you have created in google account..
        }
    });

    // Define the email content
    const mailOptions = {
        from: '"Your Website"',
        to: `${email}`,
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(4000, () => {
    console.log('Server started on port')
})
