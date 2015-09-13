import { forElements, getElement } from '../core';
import { find } from '../dom';
import { width, height, style, transform, screenPosition } from '../styles';
import { resize, unresize, load, on, off } from '../events';
import { defaultify } from '../utils/defaultify';

let defaults = {
  infinite: false,
  slideWidth: '100%',
  touchThreshold: '50%',
  swipeTime: 300,
  swipeThreshold: 10,
  gutter: 0
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

    this.touchstartCallback = this.touchstart.bind(this);
    on(this.container, 'touchstart', this.touchstartCallback);

    this.touchmoveCallback = this.touchmove.bind(this);
    on(this.container, 'touchmove', this.touchmoveCallback);

    this.touchendCallback = this.touchend.bind(this);
    on(this.container, 'touchend', this.touchendCallback);
  }

  refresh() {
    this.container = getElement(this.options.container);
    this.wrapper = find(this.container, this.options.wrapper);
    this.slides = find(this.container, this.options.slides);
    this.nbSlide = this.slides.length;

    style(this.slides, {
      marginLeft: this.halfGutter+'px',
      marginRight: this.halfGutter+'px'
    });

    style(this.wrapper, {
      marginLeft: -this.halfGutter+'px',
      marginRight: -this.halfGutter+'px'
    });
  }

  resize() {
    this.containerWidth = width(this.container);


    if (typeof this.options.slideWidth == 'string' && this.options.slideWidth.indexOf('%') != -1)
      this.slideWidth = this.containerWidth * parseInt(this.options.slideWidth, 10) / 100;
    else
      this.slideWidth = parseInt(this.options.slideWidth, 10);

    if (typeof this.options.touchThreshold == 'string' && this.options.touchThreshold.indexOf('%') != -1)
      this.touchThreshold = this.slideWidth * parseInt(this.options.touchThreshold, 10);
    else
      this.touchThreshold = this.options.touchThreshold;

    if (typeof this.options.swipeThreshold == 'string' && this.options.swipeThreshold.indexOf('%') != -1)
      this.swipeThreshold = this.slideWidth * parseInt(this.options.swipeThreshold, 10);
    else
      this.swipeThreshold = this.options.swipeThreshold;

    width(this.slides, this.slideWidth);
    width(this.wrapper, (this.slideWidth + this.gutter) * this.nbSlide);

    if (!height(this.wrapper)) {
      let maxHeight = 0;

      forEach(this.slides, (slide) => {
        maxHeight = Math.max(maxHeight, height(slide))
      });

      height(this.wrapper, maxHeight);
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
    this.touchOrig = event.touches[0].pageX;
    this.swipeNext = null;
    this.tween = null;
    this.time = new Date().getTime();

    event.stopPropagation();
  }

  touchmove(event) {
    if (!this.touchOrig) return;

    this.touchLength = event.touches[0].pageX - this.touchOrig;
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

    event.stopPropagation();
  }

  touchend(event) {
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

    event.stopPropagation();
  }

  on(callback) {
    this.callbacks.push(callback);
  }

  off(callback) {
    this.callbacks.splice(this.slide.indexOf(callback));
  }

  kill() {
    unresize(this.resizeCallback);
    off(this.container, 'touchstart', this.touchstartCallback);
    off(this.container, 'touchmove', this.touchmoveCallback);
    off(this.container, 'touchend', this.touchendCallback);

    width(this.slides, '');
    width(this.wrapper, '');
    height(this.wrapper, '');
  }
}
