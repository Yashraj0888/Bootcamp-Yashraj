// database.js
const sqlite3 = require('sqlite3').verbose();
const { DB_PATH } = process.env;

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
