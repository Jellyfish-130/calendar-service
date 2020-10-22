/* eslint-disable no-console */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

let startDay = dayjs().startOf("month");
let endDay = startDay.add(Math.floor(Math.random() * 10) + 1, "day");

const reservation = (startIndex, endIndex) => {
  let reservations = [];
  for (let i = startIndex; i <= endIndex; i++) {
    let entry = {
      reservation_id: i,
      listing_id: Math.floor(Math.random() * 1000),
      check_in: startDay.format("YYYY-MM-DD"),
      check_out: endDay.format("YYYY-MM-DD"),
      guest_adults: Math.floor(Math.random() * 6) + 1,
      guest_children: Math.floor(Math.random() * 6),
      guest_infants: Math.floor(Math.random() * 3),
    };
    reservations.push(entry);

    startDay = dayjs()
      .startOf("month")
      .add(Math.floor(Math.random() * 10) + 1, "day");
    endDay = startDay.add(Math.floor(Math.random() * 5) + 1, "day");
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
  ],
});

async function writeReservations(num) {
  const chunkNum = Math.floor(num / 100);
  console.log("Chunk count: ", chunkNum);

  for (let i = 0; i < 100; i++) {
    console.log(`Working on chunk : ${i + 1}`);
    const reservationDump = reservation(chunkNum * i, chunkNum * (i + 1) - 1);
    await csvWriter.writeRecords(reservationDump);
  }
}

writeReservations(15000000);
