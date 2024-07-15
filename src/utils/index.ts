import _ from 'lodash';

export const getIntoData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};

export const convertEmptyStringsToNull = (object: Object) => {
  for (const key in object) {
    if (object[key] === '') {
      object[key] = null;
    }
  }
  return object;
};