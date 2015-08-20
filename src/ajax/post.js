import ajax from './ajax';

export function post(url, success, error) {
  return ajax('post', url, success, error);
}
