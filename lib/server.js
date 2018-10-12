const errors = require('feathers-errors');
const { checkVersion } = require('./version_checker');

// server
module.exports = function Server(minimumRequiredAppVersion) {
  return function serverHooks(context) {
    const { currentAppVersion } = context.params;

    if (!minimumRequiredAppVersion) {
      throw new Error('Function \'latestVersionResponse\' must contain a parameter e.g latestVersionResponse(\'1.2.0\')');
    }

    if (currentAppVersion) {
      if (!currentAppVersion) {
        return Promise.resolve(context);
      }

      const { updated } = checkVersion({ currentAppVersion, minimumRequiredAppVersion });

      if (!updated) {
        throw new errors.BadRequest('OUTDATED', { outdated: true });
      }
    }

    return Promise.resolve(context);
  };
};
