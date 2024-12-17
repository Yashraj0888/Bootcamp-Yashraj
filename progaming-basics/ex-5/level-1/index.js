// app.js
const express = require('express');
const config = require('./config');  // Import configuration from config.js

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Database Host: ${config.dbHost}`);
  console.log(`Database User: ${config.dbUser}`);
});
