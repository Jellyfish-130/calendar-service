const router = require("express").Router();

const db = require("../database/connectToDatabaseRemote.js");

setTimeout(() => {
  const schema = require("../database/schema.js");

  schema.Listing.findOne({ listing_id: "98" })
    .then((listing) => {
      console.log(listing);

      // schema.Listing.update({ listing_id: 98 }, { vivek: "something" }, () => {
      //   console.log("Update");
      // });
    })
    .catch((e) => console.log);
}, 3000);
