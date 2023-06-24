require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Router
const authRouter = require('./routes/V1/Auth');
const categoryRouter = require('./routes/V1/Category');
const courseRouter = require('./routes/V1/Course');
const mediaRouter = require('./routes/V1/Media');
const newsRouter = require('./routes/V1/News');
const orderRouter = require('./routes/V1/Order');
const promotionRouter = require('./routes/V1/Promotion');
const userRouter = require('./routes/V1/User');
const webhookRouter = require('./routes/V1/Webhook');

// const https = require('https')
// const http = require('http')

const app = express()

// http.createServer(app).listen(80)
// // https.createServer({
// //   key: fs.readFileSync('/path/to/private.key'),       // Replace with the path to your private key file
// //   cert: fs.readFileSync('/path/to/certificate.crt'),
// // }, app).listen(443)

const whitelist = [
  process.env.FRONTEND_URL,
]
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// Disable CORS
app.use(cors(corsOptionsDelegate));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/auth', authRouter);
app.use('/v1/category', categoryRouter);
app.use('/v1/user', userRouter);
app.use('/v1/course', courseRouter);
app.use('/v1/media', mediaRouter);
// app.use('/v1/news', newsRouter);
// app.use('/v1/order', orderRouter);
// app.use('/v1/promotion', promotionRouter);
// app.use('/v1/webhook', webhookRouter);

module.exports = app;
