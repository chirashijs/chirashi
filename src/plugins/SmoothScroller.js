import { forEach, forElements, getElement } from '../core';
import { style, height, width, transform, offset } from '../styles';
import { defaultify } from '../utils/defaultify';
import { VirtualScroll } from './VirtualScroll';
import './scroll60fps';

let defaults = {
  ease: 0.2,
  autoEase: 0.08,
  fixed: []
};

export class SmoothScroller {
  constructor(config) {
    if (typeof config == 'string')
      config = {
        wrapper: config
      };

    this.config = defaultify(config, defaults);

    this.wrapper = getElement(this.config.wrapper);
    style('html, body', {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'fixed'
    });

    style(this.wrapper, {
      'will-change': 'transform'
    });

    this.scroll = {
      x: 0,
      y: 0
    };

    this.scrollTarget = {
      x: 0,
      y: 0
    };

    this.ease = this.config.ease;
    this.autoEase = this.config.autoEase;
    this.scrollDisabled = false;

    this.fixed = [];
    this.fixElements(this.config.fixed);

    this.scrollCallbacks = [];

    this.localCallback = this.scrolling.bind(this);
    VirtualScroll.on(this.localCallback);

    this.normalScroll();
    this.update();
  }

  scrolling(event) {
    if (this.scrollDisabled) return;

    const wrapperWidth  = width(this.wrapper),
          windowWidth   = window.innerWidth,
          wrapperHeight = height(this.wrapper),
          windowHeight  = window.innerHeight;

    this.scrollTarget = {
        x: Math.min(Math.max(this.scroll.x - event.deltaX, 0), wrapperWidth > windowWidth ? wrapperWidth - windowWidth : 0),
        y: Math.min(Math.max(this.scroll.y - event.deltaY, 0), wrapperHeight > windowHeight ? wrapperHeight - windowHeight : 0)
    };

    this.triggerCallbacks();
  }

  normalScroll() {
    if (this.scrollDisabled) return;

    this.scroll = {
      x: this.scroll.x + (this.scrollTarget.x - this.scroll.x) * this.ease,
      y: this.scroll.y + (this.scrollTarget.y - this.scroll.y) * this.ease
    };

    this.normalRequest = requestAnimationFrame(this.normalScroll.bind(this));
  }

  autoScroll() {
    this.scroll = {
      x: this.scroll.x + (this.scrollTarget.x - this.scroll.x) * this.autoEase,
      y: this.scroll.y + (this.scrollTarget.y - this.scroll.y) * this.autoEase
    };

    this.triggerCallbacks();

    if (Math.abs(this.scrollTarget.y - this.scroll.y) > 1 || Math.abs(this.scrollTarget.x - this.scroll.x) > 1)
        this.autoScrollRequest = requestAnimationFrame(this.autoScroll.bind(this));
    else
        this.enableScroll();
  }

  triggerCallbacks() {
    let i = this.scrollCallbacks.length;
    while(i--) this.scrollCallbacks[i](this.scrollTarget);
  }

  update() {
    transform(this.wrapper, {
      x: -this.scroll.x,
      y: -this.scroll.y
    });

    forEach(this.fixed, (fixed) => {
        transform(fixed.element, {
            x: this.scroll.x - fixed.initial.x,
            y: this.scroll.y - fixed.initial.y
        });
    });

    this.updateRequest = requestAnimationFrame(this.update.bind(this));
  }

  on(callback) {
    this.scrollCallbacks.push(callback);
  }

  off(callback) {
    this.scrollCallbacks.splice(this.scrollCallbacks.indexOf(callback));
  }

  scrollTo(target) {
    this.disableScroll();

    const wrapperWidth  = width(this.wrapper),
          windowWidth   = window.innerWidth,
          wrapperHeight = height(this.wrapper),
          windowHeight  = window.innerHeight;

    this.scrollTarget = {
        x: Math.min(Math.max(target.x, 0), wrapperWidth > windowWidth ? wrapperWidth - windowWidth : 0),
        y: Math.min(Math.max(target.y, 0), wrapperHeight > windowHeight ? wrapperHeight - windowHeight : 0)
    };

    this.autoScroll();
  }

  disableScroll() {
    this.scrollDisabled = true;
  }

  enableScroll() {
    this.scrollDisabled = false;
    this.normalScroll();
  }

  fixElements(elements) {
      style(elements, {
          position: 'absolute'
      });

      forElements(elements, (element) => {
          let elOffset = offset(element);
          this.fixed.push({
              element: element,
              initial: this.scroll
          });
      });
  }

  unfixElements(elements) {
      style(elements, {
          position: '',
          transform: ''
      });

      forElements(elements, (element) => {
          let i = this.fixed.length, done = false;

          while(!done && i--) {
              if (done = this.fixed[i].element == element) {
                  this.fixed.splice(i, 1);
                  style(element, {
                    transform: ''
                  });
              }
          }
      });
  }

  kill() {
      cancelAnimationFrame(this.normalRequest);
      cancelAnimationFrame(this.autoScrollRequest);
      cancelAnimationFrame(this.updateRequest);
      VirtualScroll.off(this.localCallback);

      style('html, body', {
        width: '',
        height: '',
        overflow: '',
        position: ''
      });

      style(this.wrapper, {
        transform: '',
        'will-change': ''
      });
  }
};
