const api = require('../handlers/stravaSegments');

describe('POST /getToken', () => {
  describe('queryStringParameters is missing', () => {
    let response;

    beforeEach(async () => {
      response = await api.getToken();
    });

    it('should return 400', async () => {
      expect(response.statusCode).toBe(400);
    });

    it('should contain error message', () => {
      const body = JSON.parse(response.body);

      expect(body).toEqual({ error: 'missing authorisationCode in request' });
    });
  });

  describe('empty queryStringParameters', () => {
    let response;

    beforeEach(async () => {
      response = await api.getToken({ queryStringParameters: {} });
    });

    it('should return 400', async () => {
      expect(response.statusCode).toBe(400);
    });

    it('should contain error message', () => {
      const body = JSON.parse(response.body);

      expect(body).toEqual({ error: 'missing authorisationCode in request' });
    });
  });

  describe.each([undefined, null, ''])('authorisationCode is "%s"', (authorisationCode) => {
    let response;

    beforeEach(async () => {
      response = await api.getToken({ queryStringParameters: { authorisationCode } });
    });

    it('should return 400', async () => {
      expect(response.statusCode).toBe(400);
    });

    it('should contain error message', () => {
      const body = JSON.parse(response.body);

      expect(body).toEqual({ error: 'missing authorisationCode in request' });
    });
  });
});
