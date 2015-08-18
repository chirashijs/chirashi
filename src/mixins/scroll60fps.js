export function scroll60fps() {
    var scrolling = false,
        body = document.body,
        timer;

    window.addEventListener('scroll', function() {
      clearTimeout(timer);

      if(!scrolling) {
        scrolling = true;
        body.classList.add('scrolling');
        body.style['pointer-events'] = 'none';
      }

      timer = setTimeout(function(){
        scrolling = false;
        body.classList.remove('scrolling');
        body.style['pointer-events'] = '';
      }, 200);
    }, false);
}
