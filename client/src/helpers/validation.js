import get from 'lodash/get';
import set from 'lodash/set';

const emailRegex = /^(?:[A-Za-z0-9_!#$%&'*+-/=?^`{|}~]+\.)*[A-Za-z0-9_!#$%&'*+-/=?^`{|}~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/i; // eslint-disable-line max-len

const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) =>
  rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function required(value) {
  if (isEmpty(value)) {
    return { id: 'error.required', defaultMessage: 'Required' };
  }
  return false;
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key]));
      const error = rule(get(data, key), data);
      if (error) {
        set(errors, key, error);
      }
    });

    return errors;
  };
}

export function email(value) {
  if (!isEmpty(value) && !emailRegex.test(value)) {
    return {
      id: 'error.email',
      defaultMessage: 'Invalid email address',
    };
  }

  return false;
}

export function max(maxValue, message) {
  return (value) => {
    if (value > maxValue) {
      return (
        message || {
          id: 'error.maxValue',
          defaultMessage: `Value should be at most ${maxValue}`,
        }
      );
    }
    return false;
  };
}

export function min(minValue, message) {
  return (value) => {
    if (value < minValue) {
      return (
        message || {
          id: 'error.minValue',
          defaultMessage: `Value should be at least ${minValue}`,
        }
      );
    }
    return false;
  };
}
