const validation = require('./validation');
const checkUnmatchVersion = require('./check-unmatch-version');
const isUpdateNeeded = require('./is-update-needed');

module.exports.checkVersion = function checkVersion(dataVersion = {}) {
  if (!Object.keys(dataVersion).length) {
    return {
      updated: true,
      incompatible: [],
    };
  }

  const matchConclusion = checkUnmatchVersion(dataVersion);

  if (!matchConclusion.length) {
    return {
      updated: true,
      incompatible: [],
    };
  }

  if (!validation(dataVersion).success) {
    return {
      updated: true,
      incompatible: [],
    };
  }

  return isUpdateNeeded(matchConclusion);
};
