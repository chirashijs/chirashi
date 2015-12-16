import forEach from '../core/for-each';
import getElement from '../core/get-element';
import getSelectorAll from '../core/get-selector-all';

import createElement from '../dom/create-element';
import remove from '../dom/remove';
import append from '../dom/append';
import find from '../dom/find';
import parent from '../dom/parent';
import indexInParent from '../dom/index-in-parent';
import addClass from '../dom/add-class';
import removeClass from '../dom/remove-class';

import size from '../styles/size';
import height from '../styles/height';
import width from '../styles/width';
import style from '../styles/style';
import transform from '../styles/transform';
import screenPosition from '../styles/screen-position';

import resize from '../events/resize';
import unresize from '../events/unresize';
import load from '../events/load';
import on from '../events/on';
import off from '../events/off';

import defaultify from '../utils/defaultify';

import Cover from './cover';

const defaults = {
  infinite: false,
  slideWidth: '100%',
  slideHeight: '100%',
  size: 'container',
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

    this.coverManager = new Cover();

    this.current = 0;
    this.animating = false;

    if (typeof this.options.size != 'object') {
      this.options.size = {
        width: this.options.size,
        height: this.options.size
      };
    }

    if (this.options.bullets) {
        this.bulletClickCallback = this.bulletClick.bind(this);
        this.leftClickCallback = (e) => {
            e.preventDefault();

            this.slideDown();
        };
        this.rightClickCallback = (e) => {
            e.preventDefault();

            this.slideUp();
        };
    }

    this.refresh();
    this.resizeCallback = resize(this.resize.bind(this));

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

    if (this.options.auto) this.nextTimeout = setTimeout(this.slideUp.bind(this), this.options.auto);
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
      this.coverManager.addElements({
          elements: find(this.container, '.cover'),
          mode: this.options.cover
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

    if (this.options.bullets) {
        remove(find(this.container, '.'+this.options.bullets.wrapper));

        append(this.container, '<div class='+this.options.bullets.wrapper+'></div>');
        let bulletsWrapper = find(this.container, '.'+this.options.bullets.wrapper),
            i = -1;

        if (this.options.bullets.arrows) append(bulletsWrapper, '<a class="'+ this.options.bullets.arrows.class+' left" href="#">'+ this.options.bullets.arrows.element +'</a>');

        let bullets = createElement('<ul></ul>');
        while(++i < this.slides.length) {
            append(bullets, '<li>'+this.options.bullets.element.replace('$index', i+1)+'</li>');
        }
        append(bulletsWrapper, bullets);

        if (this.options.bullets.arrows) append(bulletsWrapper, '<a class="'+ this.options.bullets.arrows.class+' right" href="#">'+ this.options.bullets.arrows.element +'</a>');

        addClass('.'+this.options.bullets.wrapper+' > ul > li:first-child', 'active');

        on(find(this.container, '.'+this.options.bullets.wrapper+' > ul > li'), 'click touchstart', this.bulletClickCallback);

        if (this.options.bullets.arrows) {
            on(find(this.container, '.'+this.options.bullets.wrapper+' > .' + this.options.bullets.arrows.class + '.left'), 'click touchstart', this.leftClickCallback);
            on(find(this.container, '.'+this.options.bullets.wrapper+' > .' + this.options.bullets.arrows.class + '.right'), 'click touchstart', this.rightClickCallback);
        }
    }

    load(find(this.wrapper, 'img'), null, () => {
        this.resize();
        this.coverManager.resizeAll();
        if (this.options.initialize) this.options.initialize(this);
    });
  }

  bulletClick(event) {
      event.preventDefault();

      this.slideTo(indexInParent(event.currentTarget));
  }

  updateActiveBullet(index) {
      if (!this.options.bullets) return;

      let bullets = find(this.container, '.'+this.options.bullets.wrapper+' > ul > li');
      removeClass(bullets, 'active');
      addClass(bullets[index], 'active');
  }

  resize() {
    this.containerSize = {};
    size(this.container, {
      width: '',
      height: ''
    });

    if (this.options.size.width == 'container') {
      this.containerSize.width = width(this.container);
    }
    else if (this.options.size.width == 'slide') {
      this.containerSize.width = 0;
      forEach(this.slides, (slide) => {
        this.containerSize.width = Math.max(this.containerSize.width, width(slide));
      });
    }
    else {
      this.containerSize.width = parseInt(this.options.size.width, 10);
    }

    if (this.options.size.height == 'container') {
      this.containerSize.height = height(this.container);
    }
    else if (this.options.size.height == 'slide') {
      this.containerSize.height = 0;
      forEach(this.slides, (slide) => {
        this.containerSize.height = Math.max(this.containerSize.height, height(slide));
      });
    }
    else {
      this.containerSize.height = parseInt(this.options.size.height, 10);
    }

    size(this.container, this.containerSize);

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

    if (this.options.touchEnabled || this.options.mouseEnabled) {
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

    if (this.options.resize) this.options.resize(this);

    if (this.options.auto) {
        clearTimeout(this.nextTimeout);
        this.nextTimeout = setTimeout(this.slideUp.bind(this), this.options.auto);
    }
  }

  animationCallback() {
    this.animating = false;
    this.touchOrig = null;

    let i = this.callbacks.length;
    while(i--) this.callbacks[i](this.target, this.current);

    this.current = this.target;
    this.updateActiveBullet(this.current);

    if (this.options.auto) {
        clearTimeout(this.nextTimeout);
        this.nextTimeout = setTimeout(this.slideUp.bind(this), this.options.auto);
    }
  }

  slideDown() {
    this.slideTo(this.current-1);
  }

  slideUp() {
    this.slideTo(this.current+1);
  }

  computeTarget(index) {
    if (index < 0) index = this.nbSlide + index;
    return index % this.nbSlide;
  }

  slideTo(target, paused = false) {
    if (this.animating) return;

    this.animating = !paused;

    this.target = this.computeTarget(target);

    let tween = this.options.animationTween(this, this.animationCallback.bind(this));

    if (paused) tween.pause();
    else this.updateActiveBullet(this.target);

    return tween;
  }

  touchstart(event) {
    let touch = event.touches[0];

    this.dragStart({
      x: touch.pageX,
      y: touch.pageY
    });

    // event.stopPropagation();
  }

  touchmove(event) {
    if (!this.touchOrig) return;

    let touch = event.touches[0];

    this.dragMove({
      x: touch.pageX,
      y: touch.pageY
    });

    // event.stopPropagation();
  }

  touchend(event) {
    this.dragEnd();

    // event.stopPropagation();
  }

  mousestart(event) {
    this.dragStart({
      x: event.pageX,
      y: event.pageY
    });

    // event.preventDefault();
  }

  mousemove(event) {
    if (!this.touchOrig) return;

    this.dragMove({
      x: event.pageX,
      y: event.pageY
    });

    // event.preventDefault();
  }

  mouseend(event) {
    this.dragEnd();
    // event.preventDefault();
  }

  dragStart(position) {
    if (this.animating) return;

    if (this.options.auto) clearTimeout(this.nextTimeout);

    this.touchOrig = position;
    this.touchLength = 0;

    this.swipeNext = null;
    this.time = new Date().getTime();
  }

  dragMove(position) {
    if (!this.touchOrig || this.animating) return;

    this.touchLength = this.options.touchDirection == 'horizontal' ? position.x - this.touchOrig.x : position.y - this.touchOrig.y;
    let forward = this.touchLength < 0;

    if (this.swipeNext != forward) {
      this.swipeNext = forward;

      this.target = this.computeTarget(this.current + (this.swipeNext ? 1 : -1));
    }

    if (this.onDrag) {
      this.onDrag(this, this.touchLength);
    }
    else {
      let tween = this.slideTo(this.target, true);

      if (tween) {
        tween.progress(Math.abs(this.touchLength) / this.slideWidth);
      }
    }
  }

  dragEnd() {
    if (!this.touchOrig || this.animating) {
        this.touchOrig = null;

        return;
    }

    let absLength = Math.abs(this.touchLength);
    if (absLength > this.touchThreshold || new Date().getTime() - this.time < this.swipeTime && absLength > this.swipeThreshold) {
      this.slideTo(this.target);
    }
    else {
      this.target = this.current;

      if (this.onDragEnd) {
        this.onDragEnd(this);
        this.touchOrig = null;
      }
      else {
        this.slideTo(this.current);
      }
    }

    if (this.options.auto) this.nextTimeout = setTimeout(this.slideUp.bind(this), this.options.auto);
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

    if (this.options.bullets) {
      off(find(this.container, '.'+this.options.bullets.wrapper+' > ul > li'), 'click touchstart', this.bulletClickCallback);
      if (this.options.bullets.arrows) {
        off(find(this.container, '.'+this.options.bullets.wrapper+' > .' + this.options.bullets.arrows.class + '.left'), 'click touchstart', this.leftClickCallback);
        off(find(this.container, '.'+this.options.bullets.wrapper+' > .' + this.options.bullets.arrows.class + '.right'), 'click touchstart', this.rightClickCallback);
      }
      remove(find(this.container, '.'+this.options.bullets.wrapper));
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

    if (this.options.clearAnimation) this.options.clearAnimation(this);
    if (this.nextTimeout) clearTimeout(this.nextTimeout);

    if (this.coverManager) this.coverManager.removeElements(find(this.container, '.cover'));
  }
}

export default Slider;
