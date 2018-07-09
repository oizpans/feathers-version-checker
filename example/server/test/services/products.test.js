const assert = require('assert');
const app = require('../../src/app');

describe('\'products\' service', () => {
  it('registered the service', () => {
    const service = app.service('products');

    assert.ok(service, 'Registered the service');
  });
});
