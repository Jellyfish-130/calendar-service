const faker = require("faker");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const user = (num) => {
  let users = [];
  for (let i = 0; i < num; i++) {
    let entry = {
      user_id: i,
      username: ,
      email:
    };
    users.push(entry);
  }
  return users;
};

const csvWriter = createCsvWriter({
  path: "./newDatabases/PostgreSQL/CSV/users.csv",
  header: [
    { id: "user_id", title: "user_id" },
    { id: "username", title: "username" },
    { id: "email", title: "email" },
  ],
});

let userDump = user(10);

csvWriter.writeRecords(userDump).then(() => {
  console.log("Done!");
});
