const { checkVersion } = require('../../lib/version_checker');

module.exports = function validation1() {
  test('Unmatched Versioning', () => {
    const versionData = {
      currentAppVersion: '2.0.0', minimumAllowedAppVersion: '1.0.0',
    };
    const result = checkVersion(versionData);
    // console.log(result);
  });
};
