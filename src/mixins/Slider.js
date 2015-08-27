import { getSelector } from '../core';
import { find } from '../dom';
import { width } from '../styles';
import { resize } from '../events';
import { defaultify } from './defaultify';

let defaults = {
  infinite: false,
  slideWidth: '100%'
};

export class Slider {
  constructor(config) {
    this.config = defaultify(config, defaults);

    this.callbacks = this.config.callback ? [this.config.callback] : [];

    this.refresh();
    this.resize();
    this.onResize = this.resize.bind(this);
    resize(this.onResize);
  }

  refresh() {
    this.container = getSelector(this.config.container);
    this.wrapper = find(this.container, this.config.wrapper);
    this.slides = find(this.container, this.config.slides);
  }

  resize() {
    this.nbSlide = this.slides.length;
    this.containerWidth = width(this.container);

    if (this.config.slideWidth.indexOf('%'))
      this.slideWidth = this.containerWidth * parseInt(this.config.slideWidth, 10) / 100;
    else
      this.slideWidth = parseInt(this.config.slideWidth, 10);

    width(this.slides, this.slideWidth);
    width(this.wrapper, this.slideWidth * this.nbSlide);
  }

  slideTo(target) {
    
  }

  on(callback) {
    this.slide.push(callback);
  }

  off(callback) {
    this.slide.splice(this.slide.indexOf(callback));
  }
}
