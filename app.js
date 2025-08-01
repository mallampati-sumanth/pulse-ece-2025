const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./Routes/userRoutes');
const pageRouter = require('./Routes/pageRoutes');
const adminRouter = require('./Routes/adminRoutes');
const facultyRouter = require('./Routes/facultyRoutes');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cookiePraser = require('cookie-parser');
const multer = require('multer');
const methodOverride = require('method-override');

const User = require('./Models/userModel');
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let store = new MongoDBStore({
  uri: process.env.DB.replace('<password>', process.env.DB_PASSWORD),
  collection: 'mySessions',
});
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookiePraser());
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', userRouter);
app.use('/', pageRouter);
app.use('/', adminRouter);
app.use('/', facultyRouter);
app.get('*', (req, res) => {
  res.render('error');
});
module.exports = app;
