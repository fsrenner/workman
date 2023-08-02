const logger = require('../../logger');
const { logApiTransaction } = require('../../middleware/logging');

const mockRequest = (
  protocol,
  method,
  hostname,
  ip,
  path,
  originalUrl,
  get
) => ({
  protocol,
  method,
  hostname,
  ip,
  path,
  originalUrl,
  get: () => get,
});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Logging Middleware Tests', () => {
  describe('Testing logApiTransaction', () => {
    it('Should call next', () => {
      const req = mockRequest(
        'http',
        'GET',
        'localhost',
        '123.4.5.7',
        '/',
        'test',
        'test'
      );
      const res = mockResponse();
      const next = jest.fn();
      const loggerSpy = jest.spyOn(logger, 'debug');
      const logMessage = `http GET request made from localhost and ip 123.4.5.7 to path / using original url test with content-type test`;
      logApiTransaction(req, res, next);
      expect(next).toHaveBeenCalled();
      expect(loggerSpy).toHaveBeenCalledWith(logMessage);
    });
  });
});
