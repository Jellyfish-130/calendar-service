const { Client } = require("pg");

const isMac = process.platform === "darwin";

const client = new Client(
  isMac
    ? {
        user: "catherinestraus",
        database: "postgres",
        port: 5432,
      }
    : {
        user: "postgres",
        password: "catherine",
        database: "postgres",
        port: 5432,
      }
);

client.connect().then(() => {
  console.log("Connected successfully!");
});

module.exports = client;
