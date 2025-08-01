const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(conn => {
  console.log('Connected to DB');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Listening to the Port', PORT);
});
