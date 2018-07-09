const { checkVersion } = require('version_checker');
const errors = require('feathers-errors');

// server
module.exports = function Server(minimumRequiredAppVersion) {
  return function(context) {

    if (!minimumRequiredAppVersion) {
      throw new Error('Function \'latestVersionResponse\' must contain a parameter e.g latestVersionResponse(\'1.2.0\')');
    }

    const { currentAppVersion } = context.params;

    if (!currentAppVersion) {
      return Promise.resolve(context);
    }

    const { updated } = checkVersion({ currentAppVersion, minimumRequiredAppVersion });

    if (!updated ){
      throw new errors.BadRequest('OUTDATED', { outdated: true });
    }

    return Promise.resolve(context);
  };
};
