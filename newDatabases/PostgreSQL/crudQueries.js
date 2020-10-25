const { Client } = require("pg");

const client = new Client({
  user: "catherinestraus",
  database: "postgres",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected successfully"))
  .then(() =>
    client.query("SELECT * FROM calendar_service.listing WHERE listing_id = 1")
  )
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());
