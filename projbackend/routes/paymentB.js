const express = require('express');
const router = express.Router();

// middlewares
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

// callbacks
const { getToken, processPayment } = require('../controllers/paymentB')

// roures
router.get('/payment/gettoken/:userId', isSignedIn, getToken);

router.post('/payment/braintree/:userId', isSignedIn, processPayment);

module.exports = router;