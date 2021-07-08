const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const passportSetup = require('./config/passportSetup');
const passport = require('passport');
const cookieSession = require('cookie-session');

//template engine is ejs
app.set('view engine', 'ejs');

//connect to mongodb
const dbURI = process.env.MONGODB_URL;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('connected to mongodb'))
  .catch(err => console.log(err));

//static files
app.use(express.static("public"));

app.use(cookieSession({
  maxAge: 24*60*60*1000,
  keys: [process.env.COOKIE_KEY]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//auth routes
app.use('/auth',authRoutes);

//profile routes
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.render('home',{
      user: req.user
    });
});

//listen to requests
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});