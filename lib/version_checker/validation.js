const Schema = require('../schema.json');

module.exports = function validation(data) {
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
};
