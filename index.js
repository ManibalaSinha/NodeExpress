const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from Render!');
});
app.get('/about', (req, res) => {
  res.send('About Page - Node Express App');
});
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: "Manibala" }]);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




