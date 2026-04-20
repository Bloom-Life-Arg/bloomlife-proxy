const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ACCESS_TOKEN = '8c2c0a239d7c4c1003edd283fb8f231e3626b45f';
const USER_ID = '4969223';
const BASE = 'https://api.tiendanube.com/v1/' + USER_ID;
const HEADERS = {
  'Authentication': 'bearer ' + ACCESS_TOKEN,
  'User-Agent': 'BloomLife Dashboard (sergio@bloomlife.co)',
  'Content-Type': 'application/json'
};

app.get('/api/*', async (req, res) => {
  try {
    const path = req.params[0];
    const query = req.url.split('?')[1] ? '?' + req.url.split('?')[1] : '';
    const url = BASE + '/' + path + query;
    const response = await fetch(url, { headers: HEADERS });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));
