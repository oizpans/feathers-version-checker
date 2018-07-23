const { checkVersion } = require('../../lib/version_checker');

module.exports = function Validations() {
  describe('Validations', () => {
    test.only('Unknown Field', () => {
      const versionData = {
        currentAppVersion: '2.0.0', wala: '1.0.0',
      };
      const result = checkVersion(versionData);

      expect(result.updated).toBe(false);
      expect(result.incompatible).toEqual([]);
    });
  });
};
