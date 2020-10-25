const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const listing = (startIndex, endIndex) => {
  let listings = [];
  for (let i = startIndex; i <= endIndex; i++) {
    let entry = {
      listing_id: i,
      cleaning_fee: Math.floor(Math.random() * 51) + 50,
      rating: (Math.floor(Math.random() * 101) + 400) / 100,
      reviews: Math.floor(Math.random() * 496) + 5,
    };
    listings.push(entry);
  }
  return listings;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/Cassandra/CSV/listingsById.csv",
  header: [
    { id: "listing_id", title: "listing_id" },
    { id: "cleaning_fee", title: "cleaning_fee" },
    { id: "rating", title: "rating" },
    { id: "reviews", title: "reviews" },
  ],
});

async function writeListings(num) {
  const chunkNum = Math.floor(num / 100);
  console.log("Chunk count: ", chunkNum);

  for (let i = 0; i < 100; i++) {
    console.log(`Working on chunk : ${i + 1}`);
    const listingDump = listing(chunkNum * i, chunkNum * (i + 1) - 1);
    await csvWriter.writeRecords(listingDump);
  }
}

writeListings(20000000);
