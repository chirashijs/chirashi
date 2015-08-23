import { getSelector, forEach } from '../core';
import { data, find, createElement, append, clone } from '../dom';
import { style, position, height, transform } from '../styles';
import { resize, scroll, load } from '../events';
import { defaultify } from './defaultify';
import { Quad } from '../easings';

//Scroll manager
export class Wasabi {
  constructor(config) {
    let defaults = {
      debug: false,
      offset: 0,
      handle: {
        top: 'top',
        bottom: 'bottom'
      }
    };

    this.config = defaultify(config, defaults);

    if (this.config.debug) {
      this.debugWrapper = createElement('<div id="wasabi-debug"></div>');
      append(document.body, this.debugWrapper);
    }

    this.scrollTop = 0;

    if (this.config.snap) {
      this.wrapper = getSelector(this.config.snap.wrapper);
      style('html, body', {
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      });
      style(this.wrapper, {
        'will-change': 'transform'
      })
    }

    scroll(this.scrolling.bind(this));

    this.update();
    this.currentZone = this.zones[0];

    resize(this.update.bind(this));

    // let i = this.zones.length,
    //     images;
    // while (i--) {
    //   load(find(this.zones[i].selector, 'img'), this.update.bind(this));
    // }
  }

  update() {
    this.zones = [];

    this.windowHeight = window.innerHeight;
    this.halfHeight = this.windowHeight/2;

    if (this.wrapper)
      this.wrapperHeight = height(this.wrapper);

    let i = this.config.zones.length;
    while (i--) {
      let zoneConfig = this.config.zones[i],
          zone = {},
          top, bottom;

      if (typeof zoneConfig.selector == 'string') {
        zone.selector = zoneConfig.selector;
        let element = getSelector(zoneConfig.selector);
        top = position(element).top;
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
          'z-index': 9999,
          position: 'fixed',
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
          position: 'fixed',
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

      if (zoneConfig.tween) {
        zone.tween = zoneConfig.tween;
        if (zone.tween.pause) zone.tween.pause();
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

      zone.forwardSize = Math.max(1, zone.forwardBottom - zone.forwardTop);

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
    }

    this.zones.sort((a, b) => {
      return a.top - b.top
    });
  }

  scrolling(scroll, position) {
    if (this.disableScroll) return;

    let newScrollTop;
    if (this.config.snap) {
      newScrollTop = this.scrollTop - scroll.top;
      this.scrollTop > newScrollTop ? 'forward' : 'backward'

      // let currentZone = this.zones[this.currentZone-1];
      let previous = this.zones[this.currentZoneIndex-1],
          next = this.zones[this.currentZoneIndex+1];
      if (previous && newScrollTop < this.currentZone.top) {
        newScrollTop < this.currentZone.top
        this.scrollTo(previous.bottom-this.windowHeight);
      }
      else if (newScrollTop < 0) {
        newScrollTop = 0;
      }
      else if (next && newScrollTop > this.currentZone.bottom - this.windowHeight) {
        newScrollTop = this.currentZone.bottom-this.windowHeight;
        this.scrollTo(next.top);
      }
      else if (newScrollTop > this.wrapperHeight - this.windowHeight) {
        newScrollTop = this.wrapperHeight - this.windowHeight;
      }
    }
    else {
      newScrollTop = position.top;
    }

    this.scrollUpdate(newScrollTop);
  }

  scrollUpdate(newScrollTop) {
    let i = this.zones.length,
        direction = this.scrollTop > newScrollTop ? 'forward' : 'backward';
    this.scrollTop = newScrollTop;

    if (this.config.debug) {
      transform('.wasabi-marker', {
        y: -this.scrollTop
      });
    }

    if (this.config.snap) {
      transform(this.wrapper, {
        y: -newScrollTop
      });
    }

    while (i--) {
      let zone = this.zones[i], entered, progress;

      progress = (this.scrollTop - zone[direction+'Top'])/zone[direction+'Size'];
      entered = progress >= 0 && progress <= 1;

      if (zone.handler) {
        if (!zone.entered && entered) zone.handler(direction, 'enter', zone.selector);
        else if (zone.entered && !entered) zone.handler(direction, 'leave', zone.selector);
      }

      zone.entered = entered;

      if (zone.entered) {
        this.currentZone = zone;
        this.currentZoneIndex = i;

        if (zone.selector) {
          forEach(zone.selector + ' [data-wasabi]', (element) => {
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
        if (zone.tween && zone.tween.progress) zone.tween.progress(progress);
      }
    }
  }

  scrollTo(top) {
    this.disableScroll = true;

    let frame = 0;
    const begin = this.scrollTop,
      change = top - begin,
      frameUpdate = () => {
        this.scrollUpdate(Quad.easeInOut(frame++, begin, change, 50));

        if (frame <= 50)
          requestAnimationFrame(frameUpdate);
        else
          this.disableScroll = false;
      };

    frameUpdate();
  }
}
