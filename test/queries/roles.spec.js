const { GET_ROLES } = require('../../queries/roles');

describe('Queries Test', () => {
  describe('Testing the Roles Queries', () => {
    it('Should verify the queries are defined', async () => {
      expect(GET_ROLES).toBeDefined();
    });
  });
});
