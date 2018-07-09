const { checkVersion } = require('version_checker');
const { paramsForServer } = require('feathers-hooks-common');
const errors = require('feathers-errors');
// const objectAssign = require('./object-assign');
//
// client
module.exports.client = function client(appVersion) {
  return async function hook(context) {
    if (!context) {
      throw new Error('Context is not defined!');
    }

    if (!appVersion) {
      throw new Error('Function \'checkForLatestVersion\' must contain a parameter e.g checkForLatestVersion(\'1.2.0\')');
    }

    if (!context.params.query.$client) {
      throw new Error('feathers-hooks-common/paramsForServer() must be defined!');
    }

    if (!context.params.query.$client.currentAppVersion) {
      throw new Error('context.params.query.$client.currentAppVersion is missing');
    }

    return Promise.resolve(context);
  };
};

// server
module.exports.latestVersionResponse = function latestVersionResponse(minimumVersion) {
  return async function hook(context) {
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
