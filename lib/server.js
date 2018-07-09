const { checkVersion } = require('version_checker');
const errors = require('feathers-errors');

// server
module.exports = function server(minimumVersion) {
  return async function serverHook(context) {
    if (typeof context === 'undefined') {
      throw new Error('Context is not defined!');
    } else if (typeof minimumVersion === 'undefined' || minimumVersion === '') {
      throw new Error('Function \'latestVersionResponse\' must contain a parameter e.g latestVersionResponse(\'1.2.0\')');
    } else if (context.params.currentAppVersion) {
      if (checkVersion({ currentAppVersion: context.params.currentAppVersion, minimumRequiredAppVersion: minimumVersion }).updated) {
        return context;
      }
      throw new errors.BadRequest('OUTDATED', {
        outdated: true,
      });
    }
  };
};
