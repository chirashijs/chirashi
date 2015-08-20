import ajax from './ajax';

export function delete(url, success, error) {
  return ajax('delete', url, success, error);
}
