
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(express.json());

// Security: Update with your actual frontend domain in production
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

/**
 * PAYPRO CONFIGURATION
 * Stored securely in .env
 */
const PAYPRO_CLIENT_ID = process.env.PAYPRO_CLIENT_ID;
const PAYPRO_CLIENT_SECRET = process.env.PAYPRO_CLIENT_SECRET;
const PAYPRO_API_URL = 'https://api.paypro.com.pk/v2'; // Official PayPro API URL

/**
 * 1. Fetch OAuth2 Token from PayPro
 */
async function getPayProToken() {
  try {
    const response = await axios({
      url: `${PAYPRO_API_URL}/oauth2/token`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        clientid: PAYPRO_CLIENT_ID,
        clientsecret: PAYPRO_CLIENT_SECRET
      }
    });
    return response.headers['token']; // PayPro often returns token in headers
  } catch (err) {
    console.error("PayPro Auth Failed:", err.response?.data || err.message);
    throw new Error("Gateway Authentication Failed");
  }
}

/**
 * 2. Create PayPro Bill/Donation
 */
app.post('/api/create-donation', async (req, res) => {
  const { amount, pkgName, customerName, customerEmail, customerPhone } = req.body;

  try {
    const token = await getPayProToken();
    const orderId = `RAF-${Date.now()}`;

    const billPayload = {
      merchantid: process.env.PAYPRO_MERCHANT_ID,
      orderid: orderId,
      amount: amount.toString(),
      currency: "PKR", // Or your PayPro configured currency
      description: `Donation: ${pkgName}`,
      customername: customerName || "Donor",
      customeremail: customerEmail || "donor@example.com",
      customerphone: customerPhone || "0000000000",
      expirydate: "2099-12-31", // Long-term bill or dynamic
      successurl: `${process.env.FRONTEND_URL}/success`,
      failureurl: `${process.env.FRONTEND_URL}/cancel`
    };

    const response = await axios({
      url: `${PAYPRO_API_URL}/bill/create`,
      method: 'post',
      headers: { 
        'Content-Type': 'application/json',
        'token': token 
      },
      data: billPayload
    });

    if (response.data.status === '00') {
      res.json({
        success: true,
        payment_url: response.data.payment_url, // Official PayPro hosted payment page
        orderId: orderId
      });
    } else {
      throw new Error(response.data.message || "PayPro Bill Creation Failed");
    }

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

/**
 * 3. Webhook Handling (Payment Verification)
 * PayPro sends a POST request here when payment is completed.
 */
app.post('/api/webhook/paypro', (req, res) => {
  const payload = req.body;
  
  // PayPro standard verification: Check their signature/hash if provided
  console.log("PayPro Webhook Received:", payload);

  if (payload.status === 'PAID') {
    // 1. Update your database
    // 2. Trigger email receipt
    console.log(`Donation ${payload.orderid} successful!`);
  }

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`RAF Backend running on port ${PORT}`));
