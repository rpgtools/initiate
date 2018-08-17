import PropTypes from 'prop-types';

export const makeError = e => `ApiError.${e}`;

export const Errors = {
  EXPIRED_TOKEN: makeError('EXPIRED_TOKEN'),
};

export const getRequestHeaders = token => ({
  Authorization: token ? `Bearer ${token}` : null,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export const unpackResponse = response => {
  if (response.ok) {
    return response.json();
  }
  if (response.status === 401) {
    return Promise.reject(Errors.EXPIRED_TOKEN);
  }
  return Promise.reject(response);
};

/*
  Check will give a console warning when an api response doesn't match the schema.
*/
export const check = (schema, api = 'Api') => data => {
  if (schema) {
    PropTypes.checkPropTypes(schema, data, 'api response prop', api);
  }
  return data;
};

export const checkNonObject = (schema, api = 'Api') => data => {
  if (schema) {
    PropTypes.checkPropTypes(
      { val: schema },
      { val: data },
      'api response prop',
      api
    );
  }
  return data;
};

export const makeApiServiceActionTypes = (key, value) => ({
  [key]: value,
  [`${key}_REQUEST`]: `${value}_REQUEST`,
  [`${key}_RESPONSE`]: `${value}_RESPONSE`,
  [`${key}_ERROR`]: `${value}_ERROR`,
  [`${key}_CANCELLED`]: `${value}_CANCELLED`,
});

export const makeControlServiceActionTypes = (key, value) => ({
  [key]: value,
  [`${key}_INIT`]: `${value}_INIT`,
  [`${key}_COMPLETE`]: `${value}_COMPLETE`,
  [`${key}_ERROR`]: `${value}_ERROR`,
  [`${key}_CANCELLED`]: `${value}_CANCELLED`,
});
