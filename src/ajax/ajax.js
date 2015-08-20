export function ajax(protocol, url, success, error) {
  let request = new XMLHttpRequest();
  request.open(protocol.toUpperCase(), url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400)
      success(request);
    else
      error(request);
  };

  request.onerror = error;

  request.send();
}
