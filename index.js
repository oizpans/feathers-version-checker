const { checkVersion } = require('version_checker');
const { paramsForServer } = require('feathers-hooks-common');
const errors = require('feathers-errors');

module.exports.checkForLatestVersion = function(appVersion) {
  return async function(context){
    if(typeof context === 'undefined') {
      throw new Error('Context is not defined!');
    } else if(typeof appVersion === 'undefined' || appVersion === '') {
      throw new Error("Function 'checkForLatestVersion' must contain a parameter e.g checkForLatestVersion('1.2.0')");
    } else {
      let { params } = context;
      const { query } = paramsForServer({currentAppVersion: appVersion});
      params.query = {...params.query, ...query};
      return context;
    }
  }
};

module.exports.latestVersionResponse = function(minimumVersion) {
  return async function(context){
    if(typeof context === 'undefined') {
      throw new Error('Context is not defined!');
    } else if(typeof minimumVersion === 'undefined' || minimumVersion === '') {
      throw new Error("Function 'latestVersionResponse' must contain a parameter e.g latestVersionResponse('1.2.0')");
    } else {
      if(context.params.currentAppVersion) {
        if(checkVersion({currentAppVersion: context.params.currentAppVersion, minimumRequiredAppVersion: minimumVersion}).updated) {
          return context;
        } else {
          throw new errors.BadRequest('OUTDATED', {
            outdated: true
          });
        }
      }
    }
  }
};
