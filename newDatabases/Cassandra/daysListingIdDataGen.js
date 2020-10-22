/* eslint-disable no-console */
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

booleanArray = [true, false];
let day_id = -1;

const day = (startIndex, endIndex) => {
  let days = [];

  const getLastDay = function (yy, mm) {
    return new Date(yy, mm + 1, 0).getDate();
  };

  for (i = startIndex; i <= endIndex; i++) {
    for (let month = 1; month <= 12; month += 1) {
      const startDay = dayjs()
        .startOf("month")
        .add(month - 1, "month")
        .toDate();
      const startMonth = startDay.getMonth();
      const startYear = startDay.getFullYear();
      const lastDay = getLastDay(startYear, startMonth);

      for (let day = 1; day <= lastDay; day += 1) {
        day_id = day_id + 1;
        const newDay = dayjs(startDay)
          .utc()
          .add(day - 1, "day")
          .add(6, "hours")
          .format("YYYY-MM-DD");
        const date = {
          day_id: day_id,
          listing_id: i,
          date: newDay,
          booked: booleanArray[Math.floor(Math.random() * 2)],
          price: Math.floor(Math.random() * 376) + 75,
          minimum_nights: 1,
        };
        days.push(date);
      }
    }
  }
  return days;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/Cassandra/CSV/daysByListingId.csv",
  header: [
    { id: "day_id", title: "day_id" },
    { id: "listing_id", title: "listing_id" },
    { id: "date", title: "date" },
    { id: "booked", title: "booked" },
    { id: "price", title: "price" },
    { id: "minimum_nights", title: "minimum_nights" },
  ],
});

async function writeDays(num) {
  const chunkNum = Math.floor(num / 100);
  console.log("Chunk count: ", chunkNum);

  for (let i = 0; i < 100; i++) {
    console.log(`Working on chunk : ${i + 1}`);
    const dayDump = day(chunkNum * i, chunkNum * (i + 1) - 1);
    await csvWriter.writeRecords(dayDump);
  }
}

writeDays(100000);
