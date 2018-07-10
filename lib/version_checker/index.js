const validation = require('./validation');
const checkUnmatchVersion = require('./check-unmatch-version');
const isUpdateNeeded = require('./is-update-needed');

module.exports.checkVersion = function checkVersion(dataVersion = {}) {
  try {
    if (Object.keys(dataVersion).length > 0
    && validation(dataVersion).success
    && checkUnmatchVersion(dataVersion).length > 0) {
      return isUpdateNeeded(checkUnmatchVersion(dataVersion));
    }

    return {
      updated: true,
      incompatible: [],
    };
  } catch (e) {
    throw new Error(e);
  }
};
