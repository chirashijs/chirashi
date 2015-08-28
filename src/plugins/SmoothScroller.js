import { getElement } from '../core';
import { style, height, width, transform } from '../styles';
import { defaultify } from '../utils/defaultify';
import { VirtualScroll } from './VirtualScroll';
import '../utils/scroll60fps';

let defaults = {
  ease: 0.2,
  autoEase: 0.08
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
      overflow: 'hidden'
    });

    style(this.wrapper, {
      'will-change': 'transform'
    });

    this.fixed = this.config.fixed ? (this.config.fixed.length ? this.config.fixed : [this.config.fixed]) : [];

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
    this.disableScroll = false;

    this.scrollCallbacks = [];

    VirtualScroll.on(this.scrolling.bind(this));

    this.normalScroll();
    this.update();
  }

  scrolling(event) {
    if (this.disableScroll) return;

    this.scrollTarget = {
      x: Math.max(Math.min(this.scroll.x + event.deltaX, 0), -width(this.wrapper) + window.innerWidth),
      y: Math.max(Math.min(this.scroll.y + event.deltaY, 0), -height(this.wrapper) + window.innerHeight)
    };

    let i = this.scrollCallbacks.length;
    while(i--) this.scrollCallbacks[i](this.scrollTarget);
  }

  normalScroll() {
    if (this.disableScroll) return;

    this.scroll = {
      x: this.scroll.x + (this.scrollTarget.x - this.scroll.x) * this.ease,
      y: this.scroll.y + (this.scrollTarget.y - this.scroll.y) * this.ease
    };

    requestAnimationFrame(this.normalScroll.bind(this));
  }

  autoScroll() {
    this.scroll = {
      x: this.scroll.x + (this.scrollTarget.x - this.scroll.x) * this.autoEase,
      y: this.scroll.y + (this.scrollTarget.y - this.scroll.y) * this.autoEase
    };

    this.disableScroll = Math.abs(this.scrollTarget.y - this.scroll.y) > 1 || Math.abs(this.scrollTarget.x - this.scroll.x) > 1;
    if (this.disableScroll) requestAnimationFrame(this.autoScroll.bind(this));
    else this.normalScroll();
  }

  update() {
    transform(this.wrapper, this.scroll);

    transform(this.fixed, {
      x: -this.scroll.x,
      y: -this.scroll.y
    });

    requestAnimationFrame(this.update.bind(this));
  }

  on(callback) {
    this.scrollCallbacks.push(callback);
  }

  off(callback) {
    this.scrollCallbacks.splice(this.scrollCallbacks.indexOf(callback));
  }

  scrollTo(target) {
    this.disableScroll = true;

    this.scrollTarget = {
      x: Math.max(Math.min(target.x, 0), -width(this.wrapper) + window.innerHeight),
      y: Math.max(Math.min(target.y, 0), -height(this.wrapper) + window.innerWidth)
    };

    this.autoScroll();
  }
};
