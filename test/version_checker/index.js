const empty = require('./empty');
const validations = require('./validations');

module.exports = function VersionChecker() {
  describe('Version Checker', () => {
    empty();
    validations();
  });
};
