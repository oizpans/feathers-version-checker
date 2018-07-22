const Schema = require('./schema.json');

module.exports = function validation(data) {
  // const arr = Object.entries(data);
  const missingFieldViolations = [];
  const dataTypeViolations = [];

  // console.log(arr);

  // for (let i = 0; i < arr.length; i += 1) {
  //   const arrVal = typeof arr[i][1];
  //   // collecting missing fields as error(s)
  //   console.log(arr[i][0], arr[i][1]);
  //   if (typeof Schema[arr[i][0]] === 'undefined') {
  //     missingFieldViolations.push(arr[i][0]);
  //   }
  //   // collecting wrong data type as errors
  //   // if (arrVal !== Schema[arr[i][0]].type) {
  //   //   dataTypeViolations.push(arr[i][0]);
  //   // }
  // }
  const schemaKeys = Object.keys(Schema);
  const dataKeys = Object.keys(data);

  dataKeys.forEach((fieldName) => {
    // check field if found in Schema, otherwise file a violation.
    if (!schemaKeys.includes(fieldName)) {
      missingFieldViolations.push(fieldName);
    }

    if (schemaKeys.includes(fieldName)
    && typeof data[fieldName] !== 'string') {
      dataTypeViolations.push(fieldName);
    }
  });

  const isFields = missingFieldViolations.length > 1 || dataTypeViolations.length > 1 ? 'fields' : 'field';

  if (missingFieldViolations.length) {
    return {
      success: false,
      type: 'Parameter Error',
      issue: missingFieldViolations,
      message: `The ${isFields} '${missingFieldViolations.join(', ')}' does not exist.`,
    };
  }

  if (dataTypeViolations.length) {
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
