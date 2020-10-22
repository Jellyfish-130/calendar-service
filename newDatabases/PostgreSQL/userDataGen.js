const createCsvWriter = require("csv-writer").createObjectCsvWriter;

usernameArray = [
  "Lester11",
  "Shany_Kovacek11",
  "Asia.Smitham26",
  "Roxanne79",
  "Jameson83",
  "Reid.Kihn93",
  "Grayce.Renner31",
  "Clemens17",
  "Lavina_Sauer",
  "Flavie.Roberts",
];
emailArray = [
  "Floyd_Kerluke@gmail.com",
  "Twila.Gaylord@yahoo.com",
  "Anna_Braun@gmail.com",
  "Patrick_Murazik28@hotmail.com",
  "Eduardo_Schroeder@gmail.com",
  "Marcia_Gleichner@yahoo.com",
  "Kacie_Gusikowski52@gmail.com",
  "America74@gmail.com",
  "Kamryn_Kunze17@yahoo.com",
  "Treva.Emmerich@gmail.com",
];

const user = (startIndex, endIndex) => {
  let users = [];
  for (let i = startIndex; i <= endIndex; i++) {
    let entry = {
      user_id: i,
      username: usernameArray[Math.floor(Math.random() * 10)],
      email: emailArray[Math.floor(Math.random() * 10)],
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

async function writeUsers(num) {
  const chunkNum = Math.floor(num / 100);
  console.log("Chunk count: ", chunkNum);

  for (let i = 0; i < 100; i++) {
    console.log(`Working on chunk : ${i + 1}`);
    const userDump = user(chunkNum * i, chunkNum * (i + 1) - 1);
    await csvWriter.writeRecords(userDump);
  }
}

writeUsers(20000000);
