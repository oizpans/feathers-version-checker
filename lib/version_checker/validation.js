const Schema = require('./schema.json');

module.exports = function validation(data) {
  const arr = Object.entries(data);
  const missingFieldViolations = [];
  const dataTypeViolations = [];

  for (let i = 0; i < arr.length; i += 1) {
    const arrVal = typeof arr[i][1];
    // collecting missing fields as error(s)
    if (typeof Schema[arr[i][0]] === 'undefined') {
      missingFieldViolations.push(arr[i][0]);
    }
    // collecting wrong data type as errors
    if (arrVal !== Schema[arr[i][0]].type) {
      dataTypeViolations.push(arr[i][0]);
    }
  }

  const isFields = missingFieldViolations.length > 1 || dataTypeViolations.length > 1 ? 'fields' : 'field';

  if (missingFieldViolations.length > 0) {
    return {
      success: false,
      type: 'Parameter Error',
      issue: missingFieldViolations,
      message: `The ${isFields} '${missingFieldViolations.join(', ')}' does not exist.`,
    };
  }
  if (dataTypeViolations.length > 0) {
    return {
      success: false,
      type: 'Data type Error',
      issue: dataTypeViolations,
      message: `The data type of the ${isFields} '${dataTypeViolations.join(', ')}' ${dataTypeViolations.length > 1 ? 'are' : 'is'} incorrect. See Schema for the proper data type.`,
    };
  }

  return {
    success: true,
    type: null,
    issue: [],
    message: null,
  };
};
