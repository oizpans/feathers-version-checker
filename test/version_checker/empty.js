const { checkVersion } = require('../../lib/version_checker');

module.exports = function VersionChecker() {
  test('When dataVersion is empty', () => {
    const dataVersion = {};

    const result = checkVersion(dataVersion);

    expect(result.updated).toEqual(true);
    expect(result.incompatible).toEqual([]);
  });
};
