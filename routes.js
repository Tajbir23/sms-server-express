const express = require('express');
const router = express.Router();
const messageSchema = require('./model');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

router.post('/messages', async(req, res) => {
    try {
        const {number, message, name, email} = req.body;

        await client.messages.create({
            body: message,
            from: '+17245603698',
            to: number
        })
        .then(message => console.log(message.sid))
        .catch(err => console.log(err))
        .done();

        const messages = await messageSchema.create({
            name,
            number,
            message,
            email
        })
        res.status(201).json(messages);
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;