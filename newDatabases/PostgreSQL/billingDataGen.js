const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const billing = (startIndex, endIndex) => {
  let billings = [];
  for (let i = startIndex; i <= endIndex; i++) {
    let cleaningFee = Math.floor(Math.random() * 51) + 50;
    let basePrice = Math.floor(Math.random() * 901) + 100;
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

async function writeBillings(num) {
  const chunkNum = Math.floor(num / 100);
  console.log("Chunk count: ", chunkNum);

  for (let i = 0; i < 100; i++) {
    console.log(`Working on chunk : ${i + 1}`);
    const billingDump = billing(chunkNum * i, chunkNum * (i + 1) - 1);
    await csvWriter.writeRecords(billingDump);
  }
}

writeBillings(15000000);
