require('dotenv').config();

const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const app = express();
const config = require('./config');
const logger = require('./logger');
const router = require('./routes');

const PORT = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.disable('x-powered-by');
app.use(cors(config.cors));
app.use(compression());
app.use(
  session({
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
    cookie: config.session.cookie,
  })
);
app.use(cookieParser(config.session.secret));
if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  session.cookie.secure = true;
}
app.use(passport.initialize());
app.use(passport.session());
// app.options('*', cors());
app.use('/', router);

app.listen(PORT, (err) => {
  if (err) {
    logger.error(
      `There was a problem starting the service: ${JSON.stringify(err)}`
    );
    throw new Error(err);
  }
  logger.info(`App service started on port: ${PORT}`);
});

module.exports = app;
