export function ajax(protocol, url, success, error, data) {
  let request = new XMLHttpRequest();
  request.open(protocol.toUpperCase(), url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

  request.onload = function() {
    if (request.status >= 200 && request.status < 400)
      success(request);
    else
      error(request);
  };

  request.onerror = error;

  request.send(data);
}
