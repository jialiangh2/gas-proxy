const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const GAS_URL = 'https://script.google.com/macros/s/AKfycbzTqY0tJe5lKmpLTtUtEt6Kdkb4vd9dAJS8jogn18USLAceYs-sok_7WKdB2varuPdS/exec'; 

app.use(cors());
app.use(express.json());

app.post('/submit', async (req, res) => {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy failed', details: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy running on ${PORT}`));

app.get('/fetch', async (req, res) => {
  try {
    const response = await fetch(GAS_URL);  // If GAS_URL accepts GET
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy GET failed', details: err.message });
  }
});
