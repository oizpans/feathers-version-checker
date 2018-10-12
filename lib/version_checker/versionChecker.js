function versionParser(versionString) {
  if (typeof versionString !== 'string') throw new Error('versionParser only accepts string');

  const splitString = versionString.split('.');

  if (splitString.length !== 3) throw new Error('Version should be in the format `x.x.x`');

  return splitString.map((stringNumber) => {
    const int = parseInt(stringNumber, 10);

    if (isNaN(int)) throw new Error(`${stringNumber} cannot be converted to int`); // eslint-disable-line

    return int;
  });
}

module.exports = function versionChecker(appVersion, minAllowedVersion) {
  const appVersionArray = versionParser(appVersion);
  const minAllowedVersionArray = versionParser(minAllowedVersion);

  for (let i = 0; i < minAllowedVersionArray.length; i += 1) {
    if (minAllowedVersionArray[i] < appVersionArray[i]) {
      return { updated: true };
    }

    if (minAllowedVersionArray[i] > appVersionArray[i]) {
      if (i === 0) { // major
        return {
          updated: false,
          incompatible: 'major',
          minAllowedVersion,
        };
      }

      if (i === 1) {
        return {
          updated: false,
          incompatible: 'minor',
          minAllowedVersion,
        };
      }

      if (i === 2) { // patch
        return {
          updated: false,
          incompatible: 'patch',
          minAllowedVersion,
        };
      }
    }
  }

  return { updated: true }; // equal version
};
