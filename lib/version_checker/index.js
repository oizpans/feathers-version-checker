const versionChecker = require('./versionChecker');

module.exports.checkVersion = function checkVersion(dataVersion = {}) {
  const {
    currentAppVersion,
    minimumRequiredAppVersion,
  } = dataVersion;

  const checkerResult = versionChecker(currentAppVersion, minimumRequiredAppVersion);

  if (checkerResult.incompatible !== 'patch') return checkerResult;

  return { updated: true };
};
