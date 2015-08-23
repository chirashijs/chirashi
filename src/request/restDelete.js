import { ajax } from './ajax';

export function restDelete(url, success, error) {
  return ajax('delete', url, success, error);
}
