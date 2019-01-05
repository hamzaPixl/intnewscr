import fromPairs from 'lodash/fromPairs';

const url = 'http://localhost:5000';

export function request(path, method, body, headers = {}) {
  const options = {
    method,
    headers,
    body,
  };
  return fetch(`${url}/${path}`, options);
}

export function handleResponse(response) {
  return response.json()
    .then((res) => {
      if (res.status && res.status !== 200) {
        return Promise.reject(res.message);
      }
      return res;
    });
}

export function getParams(location) {
  const searchParams = new URLSearchParams(location.search.slice(1));
  return searchParams
    ? fromPairs(Array.from(searchParams.entries()))
    : {};
}
