// Application hooks that run for every service
const { paramsFromClient } = require('feathers-hooks-common');
const log = require('./hooks/log');
const {Server} = require('../../../lib');

module.exports = {
  before: {
    all: [
      log(),
      paramsFromClient('currentAppVersion'),
      Server('1.2.0')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ log() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
