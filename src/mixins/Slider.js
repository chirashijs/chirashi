import { getSelector } from '../core';
import { find } from '../dom';
import { width, height, style, transform, screenPosition } from '../styles';
import { resize, load } from '../events';
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

    this.slideTo = this.config.infinite ? this.infiniteSlide : this.classicSlide;
    this.current = 0;

    load(find(this.wrapper, 'img'), null, this.onResize);
  }

  refresh() {
    this.container = getSelector(this.config.container);
    this.wrapper = find(this.container, this.config.wrapper);
    this.slides = find(this.container, this.config.slides);
    this.nbSlide = this.slides.length;
  }

  resize() {
    this.containerWidth = width(this.container);

    if (this.config.slideWidth.indexOf('%'))
      this.slideWidth = this.containerWidth * parseInt(this.config.slideWidth, 10) / 100;
    else
      this.slideWidth = parseInt(this.config.slideWidth, 10);

    width(this.slides, this.slideWidth);
    width(this.wrapper, this.slideWidth * this.nbSlide);

    if (!height(this.wrapper)) height(this.wrapper, height(this.slides));
  }

  animationCallback () {
      this.current = this.target;
  }

  infiniteSlide(target) {
        this.target = target % this.nbSlide;

        let middle = ~~(this.nbSlide/2), backward, slidesToMove;
        this.delta = this.target;

        if (backward = this.target > middle) this.delta -= - this.nbSlide;
        this.delta *= this.slideWidth;

        if (backward) {
            let currentX = screenPosition(this.container).right;

            slidesToMove = this.slides.filter((slide) => {
                return screenPosition(slide).right > currentX;
            });
        }
        else {
            let currentX = screenPosition(this.container).left;

            slidesToMove = this.slides.filter((slide) => {
                return screenPosition(slide).left < currentX;
            });
        }

        this.config.animationTween(this, !backward, slidesToMove, this.animationCallback.bind(this));
  }

  classicSlide(target) {
      if (target < 0 || target >= this.nbSlides) return;

      this.target = target;
      this.delta = -slider.target * slider.slideWidth;

      this.config.animationTween(this, this.animationCallback.bind(this));
  }

  on(callback) {
    this.slide.push(callback);
  }

  off(callback) {
    this.slide.splice(this.slide.indexOf(callback));
  }
}
