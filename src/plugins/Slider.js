import { forEach, getElement } from '../core';
import { find } from '../dom';
import { size, style, transform, screenPosition } from '../styles';
import { resize, unresize, load, on, off } from '../events';
import { defaultify } from '../utils/defaultify';

let defaults = {
  infinite: false,
  slideWidth: '100%',
  slideHeight: '100%',
  touchDirection: 'horizontal',
  touchThreshold: '50%',
  swipeTime: 300,
  swipeThreshold: 10,
  gutter: 0,
  direction: 'horizontal',
  cover: false,
  reverse: false,
  touchEnabled: true,
  mouseEnabled: false
};

export class Slider {
  constructor(options) {
    this.options = defaultify(options, defaults);

    this.gutter = this.options.gutter;
    this.halfGutter = this.gutter/2;
    this.onDrag = this.options.onDrag;
    this.onDragEnd = this.options.onDragEnd;
    this.swipeTime = this.options.swipeTime;

    this.callbacks = this.options.callback ? [this.options.callback] : [];

    this.refresh();
    this.resizeCallback = resize(this.resize.bind(this));

    this.current = 0;

    load(find(this.wrapper, 'img'), null, this.resize.bind(this));

    if (this.options.touchEnabled) {
      this.touchstartCallback = this.touchstart.bind(this);
      on(this.container, 'touchstart', this.touchstartCallback);
      this.touchmoveCallback = this.touchmove.bind(this);
      on(this.container, 'touchmove', this.touchmoveCallback);
      this.touchendCallback = this.touchend.bind(this);
      on(this.container, 'touchend', this.touchendCallback);
    }

    if (this.options.mouseEnabled) {
      this.mousestartCallback = this.mousestart.bind(this);
      on(this.container, 'mousedown', this.mousestartCallback);
      this.mousemoveCallback = this.mousemove.bind(this);
      on(this.container, 'mousemove', this.mousemoveCallback);
      this.mouseendCallback = this.mouseend.bind(this);
      on(this.container, 'mouseup', this.mouseendCallback);
    }
  }

  refresh() {
    this.container = getElement(this.options.container);
    this.wrapper = find(this.container, this.options.wrapper);
    this.slides = find(this.container, this.options.slides);
    this.nbSlide = this.slides.length;

    if (this.options.direction == 'horizontal') {
        style(this.slides, {
          marginLeft: this.halfGutter+'px',
          marginRight: this.halfGutter+'px'
        });

        style(this.wrapper, {
          marginLeft: -this.halfGutter+'px',
          marginRight: -this.halfGutter+'px'
        });
    }
    else if (this.options.direction == 'vertical') {
        style(this.slides, {
          marginTop: this.halfGutter+'px',
          marginBottom: this.halfGutter+'px'
        });

        style(this.wrapper, {
          marginTop: -this.halfGutter+'px',
          marginBottom: -this.halfGutter+'px'
        });
    }

    if (this.options.cover) {
      style(this.slides, {
          position: 'relative',
          overflow: 'hidden'
      });

      style(find(this.container, '.cover'), {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
      });
    }

    if (this.options.reverse) {
      let i = this.slides.length;
      while(i--) {
        style(this.slides[i], {
            'z-index': this.slides.length - i
        });
      }
    }
  }

  resize() {
    this.containerSize = size(this.container);
    this.slideSize = {
      width: null,
      height: null
    };

    if (typeof this.options.slideWidth == 'string' && this.options.slideWidth.indexOf('%') != -1)
      this.slideSize.width = this.containerSize.width * parseInt(this.options.slideWidth, 10) / 100;
    else
      this.slideSize.width = parseInt(this.options.slideWidth, 10);

    if (typeof this.options.slideHeight == 'string' && this.options.slideHeight.indexOf('%') != -1)
      this.slideSize.height = this.containerSize.height * parseInt(this.options.slideHeight, 10) / 100;
    else
      this.slideSize.height = parseInt(this.options.slideHeight, 10);

    size(this.slides, this.slideSize);

    if (this.options.touchEnabled) {
      let slideTouchSize = this.slideSize[(this.options.touchDirection == 'horizontal') ? 'width' : 'height'];

      if (typeof this.options.touchThreshold == 'string' && this.options.touchThreshold.indexOf('%') != -1)
        this.touchThreshold = slideTouchSize * parseInt(this.options.touchThreshold, 10) / 100;
      else
        this.touchThreshold = this.options.touchThreshold;

      if (typeof this.options.swipeThreshold == 'string' && this.options.swipeThreshold.indexOf('%') != -1)
        this.swipeThreshold = slideTouchSize * parseInt(this.options.swipeThreshold, 10) / 100;
      else
        this.swipeThreshold = this.options.swipeThreshold;
    }

    let wrapperSize;
    switch (this.options.direction) {
      case 'horizontal':
        wrapperSize = {
          width: (this.slideSize.width + this.gutter) * this.nbSlide,
          height: this.containerSize.height
        };

        break;

      case 'vertical':
        wrapperSize = {
          width: this.containerSize.width,
          height: (this.slideSize.height + this.gutter) * this.nbSlide
        };

        break;

      default:
        wrapperSize = this.containerSize;
    }

    size(this.wrapper, wrapperSize);

    if (this.options.cover) {
      forEach(find(this.container, '.cover'), (coverElement) => {
        let ratio,
            imgWidth = coverElement.naturalWidth,
            imgHeight = coverElement.naturalHeight,
            widthRatio = this.slideSize.width / imgWidth,
            heightRatio = this.slideSize.height / imgHeight;

        switch (this.options.cover) {
          case 'fill':
            ratio = Math.max(widthRatio, heightRatio);

            break;
          case 'fit':
            ratio = Math.min(widthRatio, heightRatio);

            break;

          default:
            ratio = 1;
        }

        size(coverElement, {
          width: ratio * imgWidth,
          height: ratio * imgHeight
        });
      });
    }
  }

  animationCallback () {
    let i = this.callbacks.length;
    while(i--) this.callbacks[i](this.target, this.current);

    this.current = this.target;
  }

  slideTo(target) {
    if (!this.options.infinite && (target < 0 || target >= this.nbSlide)) return;

    this.target = target % this.nbSlide;

    this.animating = !this.touchOrig;

    return this.options.animationTween(this, this.animationCallback.bind(this));
  }

  touchstart(event) {
    let touch = event.touches[0];

    this.dragStart({
      x: touch.pageX,
      y: touch.pageY
    });

    event.stopPropagation();
  }

  touchmove(event) {
    let touch = event.touches[0];

    this.dragMove({
      x: touch.pageX,
      y: touch.pageY
    });

    event.stopPropagation();
  }

  touchend(event) {
    this.dragEnd();
    event.stopPropagation();
  }

  mousestart(event) {
    this.dragStart({
      x: event.pageX,
      y: event.pageY
    });

    event.preventDefault();
  }

  mousemove(event) {
    if (!this.touchOrig) return;

    this.dragMove({
      x: event.pageX,
      y: event.pageY
    });

    event.preventDefault();
  }

  mouseend(event) {
    this.dragEnd();
    event.preventDefault();
  }

  dragStart(position) {
    this.touchOrig = position;

    this.swipeNext = null;
    this.tween = null;
    this.time = new Date().getTime();
  }

  dragMove(position) {
    if (!this.touchOrig) return;

    this.touchLength = this.options.touchDirection == 'horizontal' ? position.x - this.touchOrig.x : position.y - this.touchOrig.y;
    let forward = this.touchLength < 0;

    if (!this.tween || this.swipeNext != forward) {
      this.swipeNext = forward;

      let target = this.current + (this.swipeNext ? 1 : -1);
      this.tween = this.slideTo(target);

      if (this.tween) this.tween.pause();
    }

    if (this.onDrag) {
      this.onDrag(this, this.touchLength);
    }
    else if (this.tween) {
      this.tween.progress(Math.abs(this.touchLength) / this.slideWidth);
    }
  }

  dragEnd() {
    if (!this.touchOrig) return;

    let absLength = Math.abs(this.touchLength);
    if (this.tween && (absLength > this.touchThreshold || new Date().getTime() - this.time < this.swipeTime && absLength > this.swipeThreshold)) {
      this.tween.play();
    }
    else {
      this.target = this.current;

      if (this.onDragEnd) {
        this.onDragEnd(this);
      }
      else if (this.tween) {
        this.tween.reverse();
      }
    }

    this.touchOrig = null;
  }

  on(callback) {
    this.callbacks.push(callback);
  }

  off(callback) {
    this.callbacks.splice(this.slide.indexOf(callback));
  }

  kill() {
    unresize(this.resizeCallback);

    if (this.options.touchEnabled) {
      off(this.container, 'touchstart', this.touchstartCallback);
      off(this.container, 'touchmove', this.touchmoveCallback);
      off(this.container, 'touchend', this.touchendCallback);
    }

    if (this.options.mouseEnabled) {
      off(this.container, 'mousedown', this.mousestartCallback);
      off(this.container, 'mousemove', this.mousemoveCallback);
      off(this.container, 'mouseup', this.mouseendCallback);
    }

    size(this.slides, {
      width: '',
      height: ''
    });

    size(this.wrapper, {
      width: '',
      height: ''
    });

    size(this.container, {
      width: '',
      height: ''
    });

    if (this.options.clearAnimation) this.options.clearAnimation();
  }
}
