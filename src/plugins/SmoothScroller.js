import { forEach, forElements, getElement } from '../core';
import { closest, append, remove } from '../dom';
import { style, height, width, size, transform, offset, screenPosition, hide, show } from '../styles';
import { drag, undrag } from '../events';
import { defaultify, between } from '../utils';
import { VirtualScroll } from './VirtualScroll';

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

    this.ease = this.config.ease;
    this.autoEase = this.config.autoEase;
    this.scrollDisabled = false;

    style('html, body', {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      position: 'fixed'
    });

    this.scrollable = [];
    this.addScrollable(this.wrapper, this.config.scrollbar);

    this.scrollCallbacks = [];

    this.localCallback = this.scrolling.bind(this);
    VirtualScroll.on(this.localCallback);

    this.fixed = [];
    this.fixElements(this.config.fixed);

    this.normalScroll();
    this.update();
  }

  get scroll() {
    return this.scrollable[0].scroll;
  }

  set scroll(value) {
    this.scrollable[0].scroll = value;
  }

  get scrollTarget() {
    return this.scrollable[0].scrollTarget;
  }

  set scrollTarget(value) {
    this.scrollable[0].scrollTarget = value;
  }

  get delta() {
    return this.scrollable[0].delta;
  }

  scrolling(event) {
    if (this.scrollDisabled) return;

    forEach(this.scrollable, scrollable => scrollable.delta = {x:0,y:0});

    let mouse = event.originalEvent.touches ? event.originalEvent.touches[0] : event.originalEvent;

    let deltaX = event.deltaX,
        deltaY = event.deltaY;

    let scrollableX, scrollableY;

    if ('pageX' in mouse) {
      let element = document.elementFromPoint(mouse.pageX, mouse.pageY);

      if (deltaX) {
          scrollableX = this.scrollable.slice();

          scrollableX = scrollableX.filter((scrollable) => {
            scrollable.level = { value: 0 };

            return (deltaX < 0 && scrollable.xRatio < 0.99 || deltaX > 0 && scrollable.xRatio > 0.01) && !!closest(element, scrollable.element, scrollable.level);
          });

          scrollableX.sort((a, b) => {
            return a.level.value - b.level.value;
          });

          scrollableX = scrollableX.length && scrollableX[0];
      }

      if (deltaY) {
          scrollableY = this.scrollable.slice();

          scrollableY = scrollableY.filter((scrollable) => {
            scrollable.level = { value: 0 };

            return (deltaY < 0 && scrollable.yRatio < 0.99 || deltaY > 0 && scrollable.yRatio > 0.01) && !!closest(element, scrollable.element, scrollable.level);
          });

          scrollableY.sort((a, b) => {
            return a.level.value - b.level.value;
          });

          scrollableY = scrollableY.length && scrollableY[0];
      }
    }
    else {
      scrollableX = scrollableY = this.scrollable[0];
    }

    if (scrollableX) {
        scrollableX.delta = {
            x: deltaX
        };

        const wrapperWidth = width(scrollableX.element),
              parentWidth  = width(scrollableX.parent);

        scrollableX.scrollTarget.x = Math.min(Math.max(scrollableX.scroll.x - scrollableX.delta.x, 0), wrapperWidth > parentWidth ? wrapperWidth - parentWidth : 0);
    }

    if (scrollableY) {
        scrollableY.delta = {
            y: deltaY
        };

        const wrapperHeight = height(scrollableY.element),
              parentHeight  = height(scrollableY.parent);

        scrollableY.scrollTarget.y = Math.min(Math.max(scrollableY.scroll.y - scrollableY.delta.y, 0), wrapperHeight > parentHeight ? wrapperHeight - parentHeight : 0);
    }
  }

  updateScroll(ease) {
    forEach(this.scrollable, (scrollable) => {
      scrollable.scroll = {
        x: scrollable.scroll.x + (scrollable.scrollTarget.x - scrollable.scroll.x) * ease,
        y: scrollable.scroll.y + (scrollable.scrollTarget.y - scrollable.scroll.y) * ease
      };
    });
  }

  normalScroll() {
    if (this.scrollDisabled) return;

    this.updateScroll(this.ease);

    this.normalRequest = requestAnimationFrame(this.normalScroll.bind(this));
  }

  autoScroll() {
    this.updateScroll(this.autoEase);

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
    if (this.scrollTarget.y - this.scroll.y) this.triggerCallbacks();

    forEach(this.scrollable, (scrollable) => {
      transform(scrollable.element, {
        x: -scrollable.scroll.x,
        y: -scrollable.scroll.y
      });

      scrollable.xRatio = scrollable.scroll.x / (width(scrollable.element) - width(scrollable.parent));
      scrollable.yRatio = scrollable.scroll.y / (height(scrollable.element) - height(scrollable.parent));

      if (scrollable.scrollbar && scrollable.scrollbar.horizontal) {
        transform(scrollable.scrollbar.horizontal.cursor, {
          x: scrollable.xRatio * (width(scrollable.scrollbar.horizontal.bar) - width(scrollable.scrollbar.horizontal.cursor))
        });
      }

      if (scrollable.scrollbar && scrollable.scrollbar.vertical) {
        transform(scrollable.scrollbar.vertical.cursor, {
          y: scrollable.yRatio * (height(scrollable.scrollbar.vertical.bar) - height(scrollable.scrollbar.vertical.cursor))
        });
      }
    });

    forEach(this.fixed, (fixed) => {
        if (!fixed.update) return;

        transform(fixed.element, {
            x: this.scroll.x - fixed.initial.x,
            y: this.scroll.y - fixed.initial.y
        });
    });

    this.updateRequest = requestAnimationFrame(this.update.bind(this));

    if (this.justUnfixed) debugger;
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

  addScrollable(elements, scrollbar=false) {
    forElements(elements, (element) => {
      style(element.parentNode, {
        overflow: 'hidden'
      });

      let index = this.scrollable.push({
        element: element,
        parent: element.parentNode,
        scroll: {
          x: 0,
          y: 0
        },
        scrollTarget: {
          x: 0,
          y: 0
        },
        xRatio: (width(element) >= width(element.parentNode) ? 1 : 0),
        yRatio: (height(element) >= height(element.parentNode) ? 1 : 0)
      }) - 1;

      let scrollable = this.scrollable[index];
      if (scrollbar == 'auto' || scrollbar == 'vertical') {
        let scrollbarElement = append(element.parentNode, '<div class="scrollbar vertical"></div>'),
            cursorElement = append(scrollbarElement, '<div class="cursor"></div>');

        if (!scrollable.scrollbar) scrollable.scrollbar = {};
        scrollable.scrollbar.vertical = {
          bar: scrollbarElement,
          cursor: cursorElement
        };

        height(scrollable.scrollbar.vertical.cursor, height(scrollable.parent)/height(scrollable.element)*100+'%');

        let handleScrollCursor = (position) => {
          let ratio = between((position.y - screenPosition(scrollbarElement).top - height(scrollable.scrollbar.vertical.cursor)/2) / (height(scrollable.scrollbar.vertical.bar) - height(scrollable.scrollbar.vertical.cursor)));
          scrollable.scrollTarget.y = ratio * (height(scrollable.element) - height(scrollable.parent));
        };

        scrollable.dragVCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor);
      }

      if (scrollbar == 'auto' || scrollbar == 'horizontal') {
        let scrollbarElement = append(element.parentNode, '<div class="scrollbar horizontal"></div>'),
            cursorElement = append(scrollbarElement, '<div class="cursor"></div>');

        if (!scrollable.scrollbar) scrollable.scrollbar = {};
        scrollable.scrollbar.horizontal = {
          bar: scrollbarElement,
          cursor: cursorElement
        };

        width(scrollable.scrollbar.horizontal.cursor, width(scrollable.parent)/width(scrollable.element)*100+'%');

        let handleScrollCursor = (position) => {
          let ratio = between((position.x - screenPosition(scrollbarElement).left - width(scrollable.scrollbar.horizontal.cursor)/2) / (width(scrollable.scrollbar.horizontal.bar) - width(scrollable.scrollbar.horizontal.cursor)));
          scrollable.scrollTarget.x = ratio * (width(scrollable.element) - width(scrollable.parent));
        };

        scrollable.dragHCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor);
      }
    });
  }

  refreshScrollbars() {
    forEach(this.scrollable, (scrollable) => {
      if (!scrollable.scrollbar) return;

      if (scrollable.scrollbar.vertical) {
        let ratio = between(height(scrollable.parent)/height(scrollable.element));
        height(scrollable.scrollbar.vertical.cursor, ratio*100+'%');

        if (ratio == 1 || ratio == 0) hide(scrollable.scrollbar.vertical.bar);
        else show(scrollable.scrollbar.vertical.bar);
      }

      if (scrollable.scrollbar.horizontal) {
        let ratio = between(width(scrollable.parent)/width(scrollable.element));
        width(scrollable.scrollbar.horizontal.cursor, ratio*100+'%');

        if (ratio == 1 || ratio == 0) hide(scrollable.scrollbar.horizontal.bar);
        else show(scrollable.scrollbar.horizontal.bar);
      }
    });
  }

  removeScrollable(elements) {
    forElements(elements, (element) => {
      style(element.parentNode, {
        overflow: ''
      });

      let i = this.scrollable.length, done = false;

      while(!done && i--) {
        if (done = this.scrollable[i].element == element) {
          let scrollable = this.scrollable[i];

          undrag(scrollable.dragVCallbacks);
          undrag(scrollable.dragHCallbacks);

          if(scrollable.scrollbar.horizontal) remove(scrollable.scrollbar.horizontal.bar);
          if(scrollable.scrollbar.vertical) remove(scrollable.scrollbar.vertical.bar);

          this.scrollable.splice(i, 1);
        }
      }
    });
  }

  indexOf(element) {
      let i = this.fixed.length, done = false;

      while(i-- && !(done = this.fixed[i].element == element)) {}

     return done ? i : -1;
  }

  fixElements(elements) {
    style(elements, {
        position: 'absolute'
    });

    forElements(elements, (element) => {
      let index = this.indexOf(element);

      if (index == -1) {
        let elOffset = offset(element);

        this.fixed.push({
          update: true,
          element: element,
          initial: this.scroll
        });
      }
      else {
          this.fixed[index].update = true;
      }
    });
  }

  unfixElements(elements, keepTransform = false) {
    forElements(elements, (element) => {
      let i = this.fixed.length, done = false;

      let index = this.indexOf(element);

      if (!keepTransform) {
          this.fixed.splice(index, 1);

          style(element, {
            position: '',
            transform: ''
          });
      }
      else {
          this.fixed[index].update = false;
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

      forEach(this.scrollable, (scrollable) => {
        style(scrollable.parent, {
          overflow: ''
        });

        remove(scrollable.parent, '.scrollbar');

        undrag(scrollable.dragVCallbacks);
        undrag(scrollable.dragHCallbacks);
      });
      this.scrollable = null;

      forEach(this.fixed, fixed => {
        style(fixed.element, {
          transform: ''
        });
      });
      this.fixed = null;

      style(this.wrapper, {
        transform: '',
        'will-change': ''
      });
  }
};
