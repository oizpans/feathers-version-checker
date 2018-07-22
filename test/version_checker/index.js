const emptyObject = require('./empty-object');
const unmatchedVersion = require('./unmatched-version');
const validations = require('./validations');

module.exports = function versionChecker() {
  describe('Version Checker', () => {
    emptyObject();
    unmatchedVersion();
    validations();
  });
};
