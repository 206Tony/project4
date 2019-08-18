require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressJWT = require('express-jwt');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use(express.static(__dirname + '/client/build'));  // from drinks
app.use(methodOverride('_method'));  //from drinks

const loginLimiter = new RateLimit({
  windowMs: 5*60*1000,
  max: 3,
  delayMs: 0,
  message: 'Maximum login attempts exceeded!'
})

const signupLimiter = new RateLimit({
  windowMs: 60*60*1000,
  max: 3,
  delayMs: 0,
  message: "Maximum accounts created. Please try again later."
})

mongoose.connect('mongodb://localhost/jwtAuth', {useNewUrlParser: true});
const db = mongoose.connection;
db.once('open', () => {
  console.log(`Connected to Mongo on ${db.host}:${db.port}`);
});
db.on('error', (err) => {
  console.log(`Database error:\n${err}`);
});

// app.use('/auth/login', loginLimiter);
// app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/api', expressJWT({secret: process.env.JWT_SECRET}), require('./routes/api'));  //.unless({method: 'POST'}) to lock down the post route otherwise we locked down all routes
// app.get('/something', function(req, res) {
//   res.send('hello')
// })
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/client/build/index.html');  // from drinks
});

app.listen(process.env.PORT, () => {
  console.log(`You're listening to port ${process.env.PORT}...`);
});
