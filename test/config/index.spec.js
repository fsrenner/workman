const config = require('../../config');

describe('Config Tests', () => {
  describe('Testing config object', () => {
    it('Should return the config object with env variables', () => {
      expect(config).toStrictEqual({
        host: 'localhost',
        port: '3001',
        db: {
          host: 'localhost',
          database: 'workman',
          user: 'test',
          password: 'test',
          port: '5432',
        },
        logger: {
          level: 'trace',
          enabled: false,
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        },
        session: {
          secret: 'test',
          resave: true,
          saveUninitialized: true,
          cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
        },
        email: {
          service: 'test',
          host: 'test',
          auth: {
            user: 'test',
            pass: 'test',
          },
        },
      });
    });
  });
});
