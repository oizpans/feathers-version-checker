const { checkVersion } = require('../../lib/version_checker');

module.exports = function validation1() {
  test('Empty Object', () => {
    const result = checkVersion({});

    expect(result.updated).toBe(true);
    expect(result.incompatible).toEqual([]);
  });
};
