import ajax from './ajax';

export function get(url, success, error) {
  return ajax('get', url, success, error);
}
