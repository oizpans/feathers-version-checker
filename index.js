var { checkVersion } = require('version_checker');
var { paramsForServer } = require('feathers-hooks-common');
var errors = require('feathers-errors');

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

module.exports.checkForLatestVersion = function(appVersion) {
  return async function(context){
    if(typeof context === 'undefined') {
      throw new Error('Context is not defined!');
    } else if(typeof appVersion === 'undefined' || appVersion === '') {
      throw new Error("Function 'checkForLatestVersion' must contain a parameter e.g checkForLatestVersion('1.2.0')");
    } else {
      var { params } = context;
      var { query } = paramsForServer({currentAppVersion: appVersion});
      params.query = _extends({}, query, params.query);
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
