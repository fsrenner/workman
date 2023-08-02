const logger = require('../../logger');

describe('Logger Module Tests', () => {
  describe('Testing logger', () => {
    it('Should return the logger', () => {
      expect(logger).toBeDefined();
    });
  });
});
