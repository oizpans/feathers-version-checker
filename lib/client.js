const Errors = require('feathers-errors');
const { paramsForServer } = require('feathers-hooks-common');

module.exports = function client(appVersion) {
  return function clientHook(context) {
    if (!context) {
      throw new Errors.BadRequest('Context is not defined!');
    }

    if (!appVersion) {
      throw new Errors.BadRequest('appVersion is not set!');
    }

    let newContext = Object.assign({}, context.params);

    newContext = Object.assign(
      {},
      paramsForServer({ currentAppVersion: appVersion }),
      newContext.params.query,
    );

    return Promise.resolve(newContext);
  };
};
