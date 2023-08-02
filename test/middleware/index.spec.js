const { notFound, serverError } = require('../../middleware');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Middleware Module Tests', () => {
  describe('Testing notFound', () => {
    it('Should return a not found error and message', () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      notFound(req, res, next);
      const error = new Error('Not found');
      error.statusCode = 404;
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Testing notFound', () => {
    it('Should return default error message', () => {
      const err = { message: 'test' };
      const req = {};
      const res = mockResponse();
      serverError(err, req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        name: 'Server Error',
        message: err.message,
      });
    });
    it('Should return provided error message', () => {
      const err = { message: 'test', name: 'test', statusCode: 543 };
      const req = {};
      const res = mockResponse();
      serverError(err, req, res);
      expect(res.status).toHaveBeenCalledWith(543);
      expect(res.json).toHaveBeenCalledWith({
        name: err.name,
        message: err.message,
      });
    });
  });
});
