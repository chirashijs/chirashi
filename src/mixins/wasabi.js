import { get, forEach } from '../core';
import { data } from '../dom';
import { position, height, transform } from '../styles';
import { resize, scroll } from '../events';
import { defaultify } from './defaultify';

//Scroll manager
export class Wasabi {
  constructor(config) {
    this.scrollTop = 0;

    let defaults = {
      offset: 0,
      handle: {
        top: 'top',
        bottom: 'bottom'
      }
    };

    this.config = defaultify(config, defaults);

    scroll(this.scrolling.bind(this));

    this.update();
    resize(this.update.bind(this));
  }

  update() {
    this.zones = [];

    this.windowHeight = window.innerHeight;
    this.halfHeight = this.windowHeight/2;

    let i = this.config.zones.length;
    while (i--) {
      let zoneConfig = this.config.zones[i],
          zone = {},
          top, bottom;

      if (typeof zoneConfig.zone == 'string') {
        zone.name = zoneConfig.zone;
        let element = getSelector(zoneConfig.zone);
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

      zone.forwardSize = zone.forwardBottom - zone.forwardTop;

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

      zone.backwardSize = zone.backwardBottom - zone.backwardTop;

      this.zones.push(zone);
    }
  }

  scrolling(position) {
    let i = this.zones.length,
        direction = position.top > this.scrollTop ? 'forward' : 'backward';

    this.scrollTop = position.top;
    while (i--) {
      let zone = this.zones[i], entered, progress;

      progress = (this.scrollTop - zone[direction+'Top'])/zone[direction+'Size'];
      entered = progress >= 0 && progress <= 1;

      if (zone.handler) {
        if (!zone.entered && entered) zone.handler(direction, 'enter', zone.name);
        else if (zone.entered && !entered) zone.handler(direction, 'leave', zone.name);
      }

      zone.entered = entered;

      if (zone.entered) {
        if (zone.name) {
          forEach(zone.name + ' [data-wasabi]', (element) => {
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

        if (zone.progress) zone.progress(direction, progress, zone.name);
        if (zone.tween && zone.tween.progress) zone.tween.progress(progress);
      }
    }
  }
}
