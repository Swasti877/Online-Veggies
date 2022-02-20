const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KUrPtSJMMQQJFOHNYS9dzkHBc0R3enELueZZnHlyjMFdfdVyzN7YXQMI3h64J3QYQ7mOQhrijdDZA9HEI6nhqQI0084NqYFwJ')

// Express App

// - API config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Hello World' })
})

app.post('/payment/create', async (req, res) => {
    const total = req.query.total;
    console.log('Payment Revieved >>>', total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr',
        payment_method_types: ['card'],
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})

// - Listen Command
exports.api = functions.https.onRequest(app);