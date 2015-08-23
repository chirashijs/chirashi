import { ajax } from './ajax';

export function put(url, success, error) {
  return ajax('put', url, success, error);
}
