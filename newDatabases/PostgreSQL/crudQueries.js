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
    client.query("INSERT INTO calendar_service.lisitngs values (listing_id, weekend_pricing, cleaning_fee, lowest_price, rating, reviews)", [...])
  )
  .then(() => client.query("SELECT * FROM calendar_service.listings"))
  .then((results) => console.table(results.rows))
  .catch((e) => console.log(e))
  .finally(() => client.end());