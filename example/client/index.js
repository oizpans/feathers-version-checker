const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const superagent = require('superagent');
const { Client } = require('../../lib');

const app = feathers();

// Connect to the same as the browser URL (only in the browser)
// Connect to a different URL
const restClient = rest('http://localhost:3030');
app.configure(restClient.superagent(superagent));

// app hooks
app.hooks({
  before: {
    all: [
      Client('1.1.0'),
    ],
  },
});

(async function buttme() {
  try {
    await app.service('products').find();
  } catch (e) {
  console.error(e.code); // eslint-disable-line
  console.error(e.message); // eslint-disable-line
  }
}());
