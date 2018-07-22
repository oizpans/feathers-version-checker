const validation1 = require('./validation1');
const validation2 = require('./validation2');
const validation3 = require('./validation3');

module.exports = function versionChecker() {
  describe('validation', () => {
    validation1();
    validation2();
    validation3();
  });
};
