module.exports = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  db: {
    host: process.env.DB_HOSTNAME || 'localhost',
    database: process.env.DB_DATABASE || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'pass',
    port: process.env.DB_PORT || 5432,
  },
  logger: {
    enabled: !(process.env.LOG_ENABLED === 'false'),
    level: process.env.LOG_LEVEL || 'debug',
    transport:
      process.env.USE_TRANSPORT === 'true'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          }
        : {},
  },
  session: {
    secret: process.env.SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  },
  email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER || 'test@test.com',
      pass: process.env.EMAIL_PASS || 'pass',
    },
  },
};
