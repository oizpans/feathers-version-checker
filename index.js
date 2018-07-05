'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('version_checker'),
    checkVersion = _require.checkVersion;

var _require2 = require('feathers-hooks-common'),
    paramsForServer = _require2.paramsForServer;

var errors = require('feathers-errors');

module.exports.checkForLatestVersion = function (appVersion) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(context) {
      var params, _paramsForServer, query;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof context === 'undefined')) {
                _context.next = 4;
                break;
              }

              throw new Error('Context is not defined!');

            case 4:
              if (!(typeof appVersion === 'undefined' || appVersion === '')) {
                _context.next = 8;
                break;
              }

              throw new Error("Function 'checkForLatestVersion' must contain a parameter e.g checkForLatestVersion('1.2.0')");

            case 8:
              params = context.params;
              _paramsForServer = paramsForServer({ currentAppVersion: appVersion }), query = _paramsForServer.query;

              params.query = _extends({}, params.query, query);
              return _context.abrupt('return', context);

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

module.exports.latestVersionResponse = function (minimumVersion) {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(context) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(typeof context === 'undefined')) {
                _context2.next = 4;
                break;
              }

              throw new Error('Context is not defined!');

            case 4:
              if (!(typeof minimumVersion === 'undefined' || minimumVersion === '')) {
                _context2.next = 8;
                break;
              }

              throw new Error("Function 'latestVersionResponse' must contain a parameter e.g latestVersionResponse('1.2.0')");

            case 8:
              if (!context.params.currentAppVersion) {
                _context2.next = 14;
                break;
              }

              if (!checkVersion({ currentAppVersion: context.params.currentAppVersion, minimumRequiredAppVersion: minimumVersion }).updated) {
                _context2.next = 13;
                break;
              }

              return _context2.abrupt('return', context);

            case 13:
              throw new errors.BadRequest('OUTDATED', {
                outdated: true
              });

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};
