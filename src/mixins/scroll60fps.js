(function () {
    var scrolling = false,
        body = document.body,
        timer;

    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.scrolling, .scrolling * { pointer-events: none }';
    document.querySelector('head').appendChild(style);

    window.addEventListener('scroll', function() {
      clearTimeout(timer);

      if(!scrolling) {
        scrolling = true;
        body.classList.add('scrolling');
      }

      timer = setTimeout(function(){
        scrolling = false;
        body.classList.remove('scrolling');
      }, 200);
    }, false);
})();
