const Errors = require('feathers-errors');
const { paramsForServer } = require('feathers-hooks-common');

module.exports = function Client(appVersion) {
  return function clientHook(context) {
    if (!appVersion) {
      throw new Errors.BadRequest('appVersion is not set!');
    }

    const { params } = context;
    const { query } = paramsForServer({ currentAppVersion: appVersion });

    Object.keys(query).forEach((field) => {
      params.query[field] = Object
        .assign({}, (params.query || {})[field], query[field]);
    });

    return Promise.resolve(context);
  };
};
