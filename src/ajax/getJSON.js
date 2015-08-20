import ajax from './ajax';

export function getJSON(url, success, error) {
  return ajax('get', url, (response) => {
    success(JSON.parse(response.responseText));
  }, error);
}
