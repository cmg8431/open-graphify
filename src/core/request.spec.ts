import { httpRequest } from './request';
import '../mocks';

describe('httpRequest', () => {
  it('Send an HTTP request and return an example text/html', async () => {
    const { data, headers, status } = await httpRequest('http://example.com');
    expect(status).toBe(200);
    expect(headers['content-type']).toContain('text/html');
    expect(data).toContain('http://example.com');
  });
});
