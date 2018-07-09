const Errors = require('feathers-errors');
const { paramsForServer } = require('feathers-hooks-common');

module.exports = function Client(appVersion) {
  return function clientHook(context) {
    if (!appVersion) {
      throw new Errors.BadRequest('appVersion is not set!');
    }

    const { params } = context;
    const { query } = paramsForServer({ currentAppVersion: appVersion });
    params.query = Object.assign({}, query, params.query);

    return Promise.resolve(context);
  };
};
