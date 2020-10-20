/* eslint-disable no-console */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const faker = require("faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const reservations_by_user = (num) => {
  let startDay = dayjs().startOf("month");
  let endDay = startDay.add(Math.floor(Math.random() * 10) + 1, "day");

  let reservations = [];
  for (let i = 1; i <= num; i++) {
    let cleaningFee = faker.random.number({ min: 50, max: 100 });
    let basePrice = faker.random.number({ min: 100, max: 1000 });
    let serviceFee = Math.ceil(basePrice * 0.07);
    let taxes = Math.ceil(basePrice * 0.0725);
    let total = cleaningFee + basePrice + serviceFee + taxes;

    let entry = {
      reservation_id: i,
      listing_id: 1,
      check_in: startDay.format("YYYY-MM-DD"),
      check_out: endDay.format("YYYY-MM-DD"),
      guest_adults: Math.floor(faker.random.number({ min: 1, max: 6 })),
      guest_children: Math.floor(faker.random.number({ min: 0, max: 5 })),
      guest_infants: Math.floor(faker.random.number({ min: 0, max: 2 })),
      fees_cleaning_fee: cleaningFee,
      fees_base_price: basePrice,
      fees_service_fee: serviceFee,
      fees_taxes: taxes,
      fees_total: total,
    };
    reservations.push(entry);

    startDay = endDay.add(Math.floor(Math.random() * 10) + 1, "day");
    endDay = startDay.add(Math.floor(Math.random() * 10) + 1, "day");
  }
  return reservations;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/Cassandra/CSV/reservationsByListing.csv",
  header: [
    { id: "reservation_id", title: "reservation_id" },
    { id: "listing_id", title: "listing_id" },
    { id: "check_in", title: "check_in" },
    { id: "check_out", title: "check_out" },
    { id: "guest_adults", title: "guest_adults" },
    { id: "guest_children", title: "guest_children" },
    { id: "guest_infants", title: "guest_infants" },
    { id: "fees_cleaning_fee", title: "fees_cleaning_fee" },
    { id: "fees_base_price", title: "fees_base_price" },
    { id: "fees_service_fee", title: "fees_service_fee" },
    { id: "fees_taxes", title: "fees_taxes" },
    { id: "fees_total", title: "fees_total" },
  ],
});

let reservationDump = reservations_by_user(10);

csvWriter.writeRecords(reservationDump).then(() => {
  console.log("Done!");
});
