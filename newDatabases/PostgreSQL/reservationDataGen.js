/* eslint-disable no-console */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const faker = require("faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// [1, 5] [13, 15]

const reservation = (num) => {
  let startDay = dayjs().startOf("month");
  let endDay = startDay.add(Math.floor(Math.random() * 10) + 1);

  let reservations = [];
  for (let i = 0; i < num; i++) {
    let entry = {
      reservation_id: i,
      user_id: Math.floor(faker.random.number({ min: 0, max: 9 })),
      listing_id: Math.floor(faker.random.number({ min: 0, max: 9 })),
      check_in: startDay.format(),
      check_out: endDay.format(),
      guest_adults: Math.floor(faker.random.number({ min: 1, max: 6 })),
      guest_children: Math.floor(faker.random.number({ min: 0, max: 5 })),
      guest_infants: Math.floor(faker.random.number({ min: 0, max: 2 })),
    };
    reservations.push(entry);

    startDay = endDay.add(Math.floor(Math.random() * 10) + 1);
    endDay = startDay.add(Math.floor(Math.random() * 10) + 1);
  }
  return reservations;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/PostgreSQL/CSV/reservations.csv",
  header: [
    { id: "reservation_id", title: "reservation_id" },
    { id: "user_id", title: "user_id" },
    { id: "listing_id", title: "listing_id" },
    { id: "check_in", title: "check_in" },
    { id: "check_out", title: "check_out" },
    { id: "guest_adults", title: "guest_adults" },
    { id: "guest_children", title: "guest_children" },
    { id: "guest_infants", title: "guest_infants" },
  ],
});

let reservationDump = reservation(10);

csvWriter.writeRecords(reservationDump).then(() => {
  console.log("Done!");
});
