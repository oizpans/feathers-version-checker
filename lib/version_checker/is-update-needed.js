module.exports = function isUpdateNeeded(unmatchedVersions) {
  const getMajorChanges = [];
  const getMinorChanges = [];

  for (let unmv = 0; unmv < unmatchedVersions.length; unmv += 1) {
    if (unmatchedVersions[unmv].unmatch === 'MAJOR' && unmatchedVersions[unmv].value.from < unmatchedVersions[unmv].value.to) {
      getMajorChanges.push({ with: unmatchedVersions[unmv].to, changes: 'MAJOR' });
    }
    if (unmatchedVersions[unmv].unmatch === 'MINOR' && unmatchedVersions[unmv].value.from < unmatchedVersions[unmv].value.to) {
      getMinorChanges.push({ with: unmatchedVersions[unmv].to, changes: 'MINOR' });
    }
    if (unmatchedVersions[unmv].unmatch === 'MINOR' && unmatchedVersions[unmv].value.from > unmatchedVersions[unmv].value.to) {
      for (let miv = 0; miv < getMajorChanges.length; miv += 1) {
        if (getMajorChanges[miv].with === unmatchedVersions[unmv].to) {
          getMinorChanges.push({ with: unmatchedVersions[unmv].to, changes: 'MINOR' });
        }
      }
    }
  }

  if (getMajorChanges.length > 0 || getMinorChanges.length > 0) {
    return {
      updated: false,
      incompatible: [...getMajorChanges, ...getMinorChanges],
    };
  }

  return {
    updated: true,
    incompatible: [...getMajorChanges, ...getMinorChanges],
  };
};
