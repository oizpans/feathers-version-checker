const Errors = require('feathers-errors');
const { paramsForServer } = require('feathers-hooks-common');

module.exports = function Client(appVersion) {
  return function clientHook(context) {
    if (!appVersion) {
      throw new Errors.BadRequest('appVersion is not set!');
    }

    const { params } = context;
    const { query } = paramsForServer({ currentAppVersion: appVersion });

    const fieldToAssign = Object.keys(query).shift();

    if (params.query[fieldToAssign]) {
      params.query[fieldToAssign] = Object
        .assign({}, params.query[fieldToAssign], query[fieldToAssign]);
    }

    if (!params.query[fieldToAssign]) {
      params.query = Object.assign({}, params.query, query);
    }

    return Promise.resolve(context);
  };
};
