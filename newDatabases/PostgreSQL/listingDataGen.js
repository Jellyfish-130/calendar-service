const faker = require("faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const listing = (num) => {
  let listings = [];
  for (let i = 0; i < num; i++) {
    let entry = {
      listing_id: i,
      weekend_pricing: faker.random.boolean(),
      cleaning_fee: faker.random.number({ min: 50, max: 100 }),
      lowest_price: Math.floor(faker.random.number({ min: 75, max: 450 })),
      rating: faker.finance.amount(3, 4, 2),
      reviews: faker.random.number({ min: 5, max: 1500 }),
    };
    listings.push(entry);
  }
  return listings;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/PostgreSQL/CSV/listings.csv",
  header: [
    { id: "listing_id", title: "listing_id" },
    { id: "weekend_pricing", title: "weekend_pricing" },
    { id: "cleaning_fee", title: "cleaning_fee" },
    { id: "lowest_price", title: "lowest_price" },
    { id: "rating", title: "rating" },
    { id: "reviews", title: "reviews" },
  ],
});

let listingDump = listing(10);

csvWriter.writeRecords(listingDump).then(() => {
  console.log("Done!");
});
