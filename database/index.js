const { Client } = require("pg");

const client = new Client({
  user: "catherinestraus",
  database: "postgres",
  port: 5432,
});

client.connect().then(() => {
  console.log("Connected successfully!");
});

module.exports = client;
