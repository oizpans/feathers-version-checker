const Schema = require('./schema.json');

module.exports.checkVersion = function checkVersion(dataVersion = {}) {
  function validation(data) {
    const arr = Object.entries(data);
    const getMissignField = [];
    const getTypeError = [];

    for (let i = 0; i < arr.length; i += 1) {
      const arrVal = typeof arr[i][1];
      if (typeof Schema[arr[i][0]] === 'undefined') {
        getMissignField.push(arr[i][0]);
      }
      if (arrVal !== Schema[arr[i][0]].type) {
        getTypeError.push(arr[i][0]);
      }
    }

    const isFields = getMissignField.length > 1 || getTypeError.length > 1 ? 'fields' : 'field';
    if (getMissignField.length > 0) {
      return {
        success: false,
        type: 'Parameter Error',
        issue: getMissignField,
        message: `The ${isFields} '${getMissignField.join(', ')}' does not exist.`,
      };
    }
    if (getTypeError.length > 0) {
      return {
        success: false,
        type: 'Data type Error',
        issue: getTypeError,
        message: `The data type of the ${isFields} '${getTypeError.join(', ')}' ${getTypeError.length > 1 ? 'are' : 'is'} incorrect. See Schema for the proper data type.`,
      };
    }
    return {
      success: true,
      type: null,
      issue: [],
      message: null,
    };
  }

  function checkUnmatchVersion(data) {
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
  }

  function isUpdateNeeded(unmatchedVersions) {
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
  }

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
