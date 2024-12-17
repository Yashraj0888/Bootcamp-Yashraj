// app.js
require('dotenv').config();
const express = require('express');
const db = require('./database');

const app = express();

console.log("App started with database at:", process.env.DB_PATH);

app.get('/api', (req, res) => {
  res.send("API is working securely.");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
