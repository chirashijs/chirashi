import { getSelector, forElements } from '../core';
import { remove, data, find, createElement, append, clone } from '../dom';
import { style, screenPosition, height, transform } from '../styles';
import { resize, unresize, load } from '../events';
import { defaultify } from '../utils/defaultify';
import { VirtualScroll } from './VirtualScroll';

let defaults = {
  debug: false,
  offset: 0,
  ease: 0.2,
  stepMinSize: 5,
  handle: {
    top: 'top',
    bottom: 'bottom'
  }
};

//Scroll manager
export class Wasabi {
  constructor(config) {
    this.config = defaultify(config, defaults);

    this.wrapper = this.scroller ? this.scroller.wrapper : document.body;

    if (!this.config.scroller) {
      this.wrapper = document.body;
      this.scrollTop = this.previousScrollTop = screenPosition(this.wrapper).top;

      this.virtualScrollCallback = this.onVirtualScroll.bind(this);
      VirtualScroll.on(this.virtualScrollCallback);
    }
    else {
        this.scroller = this.config.scroller;

        this.wrapper = this.scroller.wrapper;
        this.scrollTop = this.previousScrollTop = this.scroller.scroll.y;

        this.scrollerCallback = this.onScroller.bind(this);
        this.scroller.on(this.scrollerCallback);
    }

    this.resizeCallback = resize(this.refresh.bind(this));

    load(find(this.wrapper, 'img'), null, () => {
        if (this.config.debug) {
          this.debugWrapper = createElement('<div id="wasabi-debug"></div>');
          style(this.debugWrapper, {
            'z-index': 9999,
            width: 25,
            height: height(this.wrapper),
            position: 'absolute',
            top: 0,
            right: 0
          });
          append(this.wrapper, this.debugWrapper);

          if (this.scroller) this.scroller.fixElement(this.debugWrapper);
        }

        this.currentSnapIndex = 0;
        this.refresh();
        this.update();
    });
  }

  refresh() {
    this.zones = [];
    this.snaps = [];

    this.windowHeight = window.innerHeight;
    this.halfHeight = this.windowHeight/2;

    if (this.wrapper) this.wrapperHeight = height(this.wrapper);
    if (this.config.debug) remove('#wasabi-debug .wasabi-marker');

    if (typeof this.config.zones == 'string') {
      forElements(this.config.zones, (element) => {
        this.addZone({}, element);
      });
    }
    else {
      let i = this.config.zones.length;
      while (i--) {
        let zoneConfig = this.config.zones[i];

        if (zoneConfig.selector) {
          forElements(zoneConfig.selector, (element) => {
            this.addZone(zoneConfig, element);
          });
        }
        else {
          this.addZone(zoneConfig);
        }
      }
    }

    if (this.snaps.length) {
      if (!this.scroller) {
        console.error('snap option needs a SmoothScroller instance');
      }

      this.snaps.sort((a, b) => {
        return a.top - b.top
      });

      this.currentSnap = this.snaps[this.currentSnapIndex];
    }
  }

  addZone(zoneConfig, element) {
    let zone = {},
        top, bottom;

    if (element) {
      zone.element = element;
      zone.selector = zoneConfig.selector;
      top = screenPosition(element).top + this.scrollTop;
      bottom = top + height(element);
    }
    else {
      top = zoneConfig.top;
      bottom = zoneConfig.bottom;
    }

    let offset = (typeof zoneConfig.offset != 'undefined') ? zoneConfig.offset : this.config.offset;

    zone.top = top + (offset.top || offset);
    zone.bottom = bottom + (offset.bottom || offset);

    if (this.config.debug) {
      let topDebug = createElement(`<div class="wasabi-marker"></div>`);
      append(this.debugWrapper, topDebug);
      style(topDebug, {
        position: 'absolute',
        top: zone.top,
        right: 0,
        width: 25,
        height: 2,
        background: 'green'
      });

      let bottomDebug = clone(topDebug);
      append(this.debugWrapper, bottomDebug);
      style(bottomDebug, {
        'z-index': 9999,
        position: 'absolute',
        top: zone.bottom,
        right: 0,
        width: 25,
        height: 2,
        background: 'green'
      });
    }

    zone.size = zone.bottom - zone.top;
    zone.handle = zoneConfig.handle || this.config.handle;
    zone.handler = zoneConfig.handler || this.config.handler;
    zone.progress = zoneConfig.progress || this.config.progress;
    zone.snap = zoneConfig.snap || this.config.snap;

    if (zoneConfig.tween) {
      zone.tween = zoneConfig.tween;
      if (zone.tween.pause) zone.tween.pause();
    }

    if (zoneConfig.progressTween) {
      zone.progressTween = zoneConfig.progressTween;
      if (zone.progressTween.pause) zone.progressTween.pause();
    }

    let handles = {};
    let handleForward = zone.handle.forward || zone.handle;
    handles.forward = {
      top: handleForward.top || handleForward,
      bottom: handleForward.bottom || handleForward
    };
    let handleBackward = zone.handle.forward || zone.handle;
    handles.backward = {
      top: handleBackward.top || handleBackward,
      bottom: handleBackward.bottom || handleBackward
    };

    if (handles.forward.top == 'middle') {
      zone.forwardTop = zone.top + this.halfHeight;
    }
    else if (handles.forward.top == 'bottom') {
      zone.forwardTop = zone.top - this.windowHeight;
    }
    else {
      zone.forwardTop = zone.top;
    }

    if (handles.forward.bottom == 'middle') {
      zone.forwardBottom = zone.bottom + this.halfHeight;
    }
    else if (handles.forward.bottom == 'bottom') {
      zone.forwardBottom = zone.bottom - this.windowHeight;
    }
    else {
      zone.forwardBottom = zone.bottom;
    }

    zone.forwardSize = Math.max(this.config.stepMinSize, zone.forwardBottom - zone.forwardTop);

    if (handles.backward.top == 'middle') {
      zone.backwardTop = zone.top + this.halfHeight;
    }
    else if (handles.backward.top == 'bottom') {
      zone.backwardTop = zone.top - this.windowHeight;
    }
    else {
      zone.backwardTop = zone.top;
    }

    if (handles.backward.bottom == 'middle') {
      zone.backwardBottom = zone.bottom + this.halfHeight;
    }
    else if (handles.backward.bottom == 'bottom') {
      zone.backwardBottom = zone.bottom - this.windowHeight;
    }
    else {
      zone.backwardBottom = zone.bottom;
    }

    zone.backwardSize = Math.max(1, zone.backwardBottom - zone.backwardTop);

    this.zones.push(zone);

    if (zone.snap) this.snaps.push(zone);
  }

  testSnapping(scrollTarget) {
    if (this.scroller.disableScroll || !this.snaps.length) return;

    let previous = this.snaps[this.currentSnapIndex-1],
        next = this.snaps[this.currentSnapIndex+1];

    if (previous && scrollTarget.y < this.currentSnap.top) {
      this.scroller.scrollTarget.y = this.currentSnap.top;
      this.scroller.scrollTo({
        x: 0,
        y: previous.bottom - Math.min(previous.size, this.windowHeight)-2
      });
    }
    else if (next && scrollTarget.y > this.currentSnap.bottom - this.windowHeight) {
      this.scroller.scrollTarget.y = this.currentSnap.bottom - this.windowHeight;
      this.scroller.scrollTo({
        x: 0,
        y: next.top+2
      });
    }
  }

  onScroller(scrollTarget) {
    this.scrollTop = this.scroller.scroll.y;
    this.testSnapping(scrollTarget);
  }

  onVirtualScroll(event) {
    this.scrollTop = screenPosition(this.wrapper).top;
  }

  update() {
    let i = this.zones.length,
        direction = this.previousScrollTop > this.scrollTop ? 'forward' : 'backward';

    while (i--) {
      let zone = this.zones[i], entered, progress;

      progress = (this.scrollTop - zone[direction+'Top'])/zone[direction+'Size'];
      entered = progress >= 0 && progress <= 1;

      if (!zone.entered && entered) {
        if (zone.tween) zone.tween.resume();
        if(zone.handler) zone.handler(direction, 'enter', zone.selector, zone.element);
      }
      else if (zone.entered && !entered) {
        if(zone.handler) zone.handler(direction, 'leave', zone.selector, zone.element);
      }

      zone.entered = entered;
      if (zone.entered) {
        let snapIndex = this.snaps.indexOf(zone);
        if (snapIndex != -1 && snapIndex != this.currentSnapIndex) {
          this.currentSnap = zone;
          this.currentSnapIndex = snapIndex;
        }

        if (zone.element) {
          forElements(find(zone.element, '[data-wasabi]'), (element) => {
            let options = eval('('+data(element, 'wasabi')+')');

            let toX = (typeof options.x !== 'undefined') ? options.x : ((options.to && options.to.x) || 0),
                toY = (typeof options.y !== 'undefined') ? options.y : ((options.to && options.to.y) || 0),
                fromX = (options.from && options.from.x) || 0,
                fromY = (options.from && options.from.y) || 0;

            transform(element, {
              x: fromX + (toX - fromX) * progress,
              y: fromY + (toY - fromY) * progress
            });
          });
        }

        if (zone.progress) zone.progress(direction, progress, zone.selector);
        if (zone.progressTween && zone.progressTween.progress) zone.progressTween.progress(progress);
      }
    }

    this.previousScrollTop = this.scrollTop;

    this.updateRequest = requestAnimationFrame(this.update.bind(this));
  }

  kill() {
    remove(this.debugWrapper);

    if (this.virtualScrollCallback) {
      VirtualScroll.off(this.virtualScrollCallback);
    }
    else if (this.scrollerCallback) {
      this.scroller.off(this.scrollerCallback);

      if (this.snapingCallback) this.scroller.off(this.snapingCallback);
    }

    let i = this.zones.length;
    while(i--) {
      let zone = this.zones[i];

      if (zone.tween) this.killTimeline(zone.tween);
      if (zone.progressTween) this.killTimeline(zone.progressTween);
    }

    this.zones = this.snaps = null;

    if (this.scroller && this.debugWrapper) this.scroller.unfixElement(this.debugWrapper);

    unresize(this.resizeCallback);

    cancelAnimationFrame(this.updateRequest);
  }

  concatenateVars(object) {
    if (!object) return;

    let keys = Object.keys(object),
        i = keys.length,
        vars = [];

    while(i--) {
        if (typeof object[keys[i]] == 'object') {
            vars = vars.concat(this.concatenateVars(object[keys[i]]));
        }
        else {
            let key = keys[i];
            vars.push(key == 'x' || key == 'y' || key == 'scale' || key == 'rotate' ? 'transform' : key);
        }
    }

    return vars;
  }

  killTimeline(timeline) {
    let tweens = timeline.getChildren();
    timeline.kill();

    let i = tweens.length, tween;
    while(i--) {
      tween = tweens[i];

      if (tween.target) {
        TweenMax.set(tween.target, {
          clearProps: this.concatenateVars(tween.vars).join(',')
        });
      }
    }
  }
}
