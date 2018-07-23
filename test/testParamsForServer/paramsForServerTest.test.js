const feathers = require('@feathersjs/feathers');
const { paramsFromClient, paramsForServer } = require('feathers-hooks-common');
const feathersVersionChecker = require('../lib');

const app = feathers();

const todosService = {
  async create() {
    return 'created';
  },
};

const {
  Client,
  Server,
} = feathersVersionChecker;

app.use('todos', todosService);

app.service('todos').hooks({
  before: {
    all: [
      (context) => {
        console.log('After Client hook', context.params.query); //eslint-disable-line
        return context;
      },
      Client('1.2.3'),
      (context) => {
        console.log('After Client hook', context.params.query); //eslint-disable-line
        return context;
      },
      paramsFromClient('currentAppVersion', 'otherParams'),
      Server('1.4.0'),
    ],
  },
});


(async function iffy() {
  try {
    const created = await app.service('todos').create(
      {
        data: true,
      },
      paramsForServer({ otherParams: 'yes' }),
    );
    console.log('Result', created);
  } catch (err) {
    console.log('Error', err.message);
  }
}());
