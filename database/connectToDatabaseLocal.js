const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/fec';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { connection } = mongoose;

// eslint-disable-next-line no-console
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('MongoDB database connection established successfully');
});

module.exports = connection;