const Schema = require('./schema.json');

module.exports = function checkUnmatchVersion(data) {
  const currentAppVersion = data[Object.entries(Schema)[0][0]].split('.');
  const minimumAllowedAppVersion = data[Object.entries(Schema)[1][0]].split('.');
  const getUnmatchedVersion = [];

  for (let a = 0; a < currentAppVersion.length; a += 1) {
    for (let b = 0; b < minimumAllowedAppVersion.length; b += 1) {
      if (a === 0 && b === 0 && currentAppVersion[a] !== minimumAllowedAppVersion[b]) { // MAJOR
        getUnmatchedVersion.push({
          from: 'currentAppVersion',
          to: 'minimumAllowedAppVersion',
          unmatch: 'MAJOR',
          value: {
            from: parseInt(currentAppVersion[a], 10),
            to: parseInt(minimumAllowedAppVersion[b], 10),
          },
        });
      }
      if (a === 1 && b === 1 && currentAppVersion[a] !== minimumAllowedAppVersion[b]) { // MINOR
        getUnmatchedVersion.push({
          from: 'currentAppVersion',
          to: 'minimumAllowedAppVersion',
          unmatch: 'MINOR',
          value: {
            from: parseInt(currentAppVersion[a], 10),
            to: parseInt(minimumAllowedAppVersion[b], 10),
          },
        });
      }
      if (a === 2 && b === 2 && currentAppVersion[a] !== minimumAllowedAppVersion[b]) { // PATCH
        getUnmatchedVersion.push({
          from: 'currentAppVersion',
          to: 'minimumAllowedAppVersion',
          unmatch: 'PATCH',
          value: {
            from: parseInt(currentAppVersion[a], 10),
            to: parseInt(minimumAllowedAppVersion[b], 10),
          },
        });
      }
    }
  }

  return getUnmatchedVersion;
};
