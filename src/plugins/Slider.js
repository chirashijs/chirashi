import { forEach, getElement } from '../core';
import { find } from '../dom';
import { width, height, style, transform, screenPosition } from '../styles';
import { resize, unresize, load, on, off } from '../events';
import { defaultify } from '../utils/defaultify';

let defaults = {
  infinite: false,
  slideWidth: '100%',
  touchThreshold: 15,
  gutter: 0
};

export class Slider {
  constructor(config) {
    this.config = defaultify(config, defaults);

    this.gutter = this.config.gutter;
    this.halfGutter = this.gutter/2;

    this.callbacks = this.config.callback ? [this.config.callback] : [];

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
    this.container = getElement(this.config.container);
    this.wrapper = find(this.container, this.config.wrapper);
    this.slides = find(this.container, this.config.slides);
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


    if (typeof this.config.slideWidth == 'string' && this.config.slideWidth.indexOf('%') != -1)
      this.slideWidth = this.containerWidth * parseInt(this.config.slideWidth, 10) / 100;
    else
      this.slideWidth = parseInt(this.config.slideWidth, 10);

    if (typeof this.config.touchThreshold == 'string' && this.config.touchThreshold.indexOf('%') != -1)
      this.touchThreshold = this.slideWidth * parseInt(this.config.touchThreshold, 10);
    else
      this.touchThreshold = this.config.touchThreshold;

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
    if (!this.config.infinite && (target < 0 || target >= this.nbSlide)) return;

    this.target = target % this.nbSlide;

    this.animating = !this.touchOrig;

    return this.config.animationTween(this, this.animationCallback.bind(this));
  }

  touchstart(event) {
    this.touchOrig = event.touches[0].pageX;
    this.swipeNext = null;
    this.tween = null;
  }

  touchmove(event) {
    this.touchLength = event.touches[0].pageX - this.touchOrig;
    let forward = this.touchLength < 0;

    if (!this.tween || this.swipeNext != forward) {
      this.swipeNext = forward;

      let target = this.current + (this.swipeNext ? 1 : -1);
      this.tween = this.slideTo(target);

      if (this.tween) this.tween.pause();
    }

    if (!this.tween) return;

    if (Math.abs(this.touchLength) >= this.touchThreshold) {
      this.tween.play();
    }
    else {
      this.tween.progress(Math.abs(this.touchLength) / this.slideWidth);
    }
  }

  touchend(event) {
    if (this.target == this.current) return;

    this.target = this.current;

    if (this.tween) this.tween.reverse();
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
