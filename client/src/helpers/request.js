const url = 'http://localhost:5000';

export function request(path, method, body, headers = {}) {
  const options = {
    method,
    headers,
    body,
  };
  return fetch(`${url}/${path}`, options);
}
