const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Render!');
});
app.get('/about', (req, res) => {
  res.send('About Page - Node Express App');
});
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: "Manibala" }]);
});
