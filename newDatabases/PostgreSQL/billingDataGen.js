const faker = require("faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const billing = (num) => {
  let billings = [];
  for (let i = 1; i <= num; i++) {
    let cleaningFee = faker.random.number({ min: 50, max: 100 });
    let basePrice = faker.random.number({ min: 100, max: 1000 });
    let serviceFee = Math.ceil(basePrice * 0.07);
    let taxes = Math.ceil(basePrice * 0.0725);
    let total = cleaningFee + basePrice + serviceFee + taxes;

    let entry = {
      billing_id: i,
      reservation_id: i,
      cleaning_fee: cleaningFee,
      base_price: basePrice,
      service_fee: serviceFee,
      taxes: taxes,
      total: total,
    };
    billings.push(entry);
  }
  return billings;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/PostgreSQL/CSV/billings.csv",
  header: [
    { id: "billing_id", title: "billing_id" },
    { id: "reservation_id", title: "reservation_id" },
    { id: "cleaning_fee", title: "cleaning_fee" },
    { id: "base_price", title: "base_price" },
    { id: "service_fee", title: "service_fee" },
    { id: "taxes", title: "taxes" },
    { id: "total", title: "total" },
  ],
});

let billingDump = billing(10);

csvWriter.writeRecords(billingDump).then(() => {
  console.log("Done!");
});
