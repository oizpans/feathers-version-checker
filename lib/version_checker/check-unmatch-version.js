// const Schema = require('./schema.json');

module.exports = function checkUnmatchVersion(data) {
  const { currentAppVersion, minimumAllowedAppVersion } = data;
  const [currentVersionMajor, currentVersionMinor, currentVersionPatch] = currentAppVersion.split('.').map(elem => Number(elem));
  const [minVersionMajor, minVersionMinor, minVersionPatch] = minimumAllowedAppVersion.split('.').map(elem => Number(elem));
  const conclusion = [];

  // MAJOR
  if (currentVersionMajor !== minVersionMajor) {
    conclusion.push({
      from: 'currentAppVersion',
      to: 'minimumAllowedAppVersion',
      unmatch: 'MAJOR',
      value: {
        from: currentVersionMajor,
        to: minVersionMajor,
      },
    });
  }

  // MINOR
  if (currentVersionMinor !== minVersionMinor) {
    conclusion.push({
      from: 'currentAppVersion',
      to: 'minimumAllowedAppVersion',
      unmatch: 'MINOR',
      value: {
        from: currentVersionMinor,
        to: minVersionMinor,
      },
    });
  }

  // PATCH
  if (currentVersionPatch !== minVersionPatch) {
    conclusion.push({
      from: 'currentAppVersion',
      to: 'minimumAllowedAppVersion',
      unmatch: 'PATCH',
      value: {
        from: currentVersionPatch,
        to: minVersionPatch,
      },
    });
  }

  return conclusion;
};
