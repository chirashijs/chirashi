import { forEach, forOf, getElement, getElements } from '../core';
import { data, find } from '../dom';
import { on, off, resize, unresize } from '../events';
import { size, style, transform } from '../styles';
import { defaultify } from '../utils/defaultify';

const M_PI = Math.PI,
      M_PI_2 = Math.PI / 2;

const defaults = {
  center: {
    x: 0.5,
    y: 0.5
  },
  easing: 0.1,
  translation: {
    x: 0,
    y: 0
  },
  rotation: {
    x: 0,
    y: 0
  },
  inertia: () => {
    return {
      x: 0,
      y: 0
    }
  }
};

export class Parallax {
  constructor(options) {
    this.options = defaultify(options, defaults);

    this.frame = 0;
    this.params = {
      angle: 0,
      length: 0,
      ratio: 0,
      xRatio: 0,
      yRatio: 0
    }

    this.refresh();
    this.resize();
    this.resizeCallback = resize(this.resize.bind(this));

    this.mousemoveCallback = this.mousemove.bind(this);
    on(this.container, 'mousemove', this.mousemoveCallback);

    if (!options.paused) this.play();
  }

  refresh() {
    this.container = getElement(this.options.container);

    let layerDefaults = {
      depth: this.options.depth,
      inertia: this.options.inertia,
      translation: this.options.translation,
      rotation: this.options.rotation
    };

    if (typeof layerDefaults.translation == 'number') {
      layerDefaults.translation = {
        x: layerDefaults.translation,
        y: layerDefaults.translation
      };
    }
    else {
      layerDefaults.translation = {
        x: 'x' in layerDefaults.translation ? layerDefaults.translation.x : 0,
        y: 'y' in layerDefaults.translation ? layerDefaults.translation.y : 0
      };
    }

    if (typeof layerDefaults.rotation == 'number') {
      layerDefaults.rotation = {
        x: layerDefaults.rotation,
        y: layerDefaults.rotation
      };
    }
    else {
      layerDefaults.rotation = {
        x: 'x' in layerDefaults.rotation ? layerDefaults.rotation.x : 0,
        y: 'y' in layerDefaults.rotation ? layerDefaults.rotation.y : 0
      };
    }

    this.layers = this.options.layers;

    forOf(this.layers, (key, value) => {
      value = defaultify(value, layerDefaults);

      if (typeof value.translation == 'number') {
        value.translation = {
          x: value.translation,
          y: value.translation
        };
      }
      else {
        value.translation = {
          x: 'x' in value.translation ? value.translation.x : layerDefaults.translation.x,
          y: 'y' in value.translation ? value.translation.y : layerDefaults.translation.y
        };
      }

      if (typeof value.rotation == 'number') {
        value.rotation = {
          x: value.rotation,
          y: value.rotation
        };
      }
      else {
        value.rotation = {
          x: 'x' in value.rotation ? value.rotation.x : layerDefaults.rotation.x,
          y: 'y' in value.rotation ? value.rotation.y : layerDefaults.rotation.y
        };
      }

      value.currentTransformation = {
        x: 0,
        y: 0,
        rotate: {
          x: 0,
          y: 0
        }
      }

      value.elements = getElements(`[data-parallax="${key}"]`);

      this.layers[key] = value;
    });
  }

  resize() {
    this.containerSize = size(this.container);

    this.center = {
      x: this.containerSize.width * this.options.center.x,
      y: this.containerSize.height * this.options.center.y
    };

    this.maxLength = Math.max(this.containerSize.width, this.containerSize.height) / 2;
  }

  mousemove(event) {
    if (!this.listen) return;

    this.updateParams({
      x: event.pageX,
      y: event.pageY
    });
  }

  updateParams(target) {
      this.params = {
        angle: Math.atan2(this.center.y - target.y, this.center.x - target.x),
        length: Math.sqrt((this.center.y - target.y) * (this.center.y - target.y) + (this.center.x - target.x) * (this.center.x - target.x))
      };

      this.params.ratio = this.params.length / this.maxLength;
      this.params.xRatio = Math.cos(this.params.angle) * this.params.ratio;
      this.params.yRatio = Math.sin(this.params.angle) * this.params.ratio;
  }

  update() {
    if (!this.playing) return;

    ++this.frame;

    forOf(this.layers, (key, value) => {
      let inertia = value.inertia(this.frame);

      let transformation = {
        x: value.translation.x * value.depth * this.params.xRatio + inertia.x * value.depth,
        y: value.translation.y * value.depth * this.params.yRatio + inertia.y * value.depth,
        rotate: {
          x: value.rotation.x * this.params.yRatio,
          y: value.rotation.y * this.params.xRatio
        }
      };

      this.layers[key].currentTransformation = {
        x: value.currentTransformation.x + (transformation.x - value.currentTransformation.x) * this.options.easing,
        y: value.currentTransformation.y + (transformation.y - value.currentTransformation.y) * this.options.easing,
        rotate: {
          x: value.currentTransformation.rotate.x + (transformation.rotate.x - value.currentTransformation.rotate.x) * this.options.easing,
          y: value.currentTransformation.rotate.y + (transformation.rotate.y - value.currentTransformation.rotate.y) * this.options.easing
        }
      }

      transform(value.elements, this.layers[key].currentTransformation);
    });

    this.updateRequest = requestAnimationFrame(this.update.bind(this));
  }

  pause() {
      this.listen = this.playing = false;
      cancelAnimationFrame(this.updateRequest);
  }

  play() {
      this.listen = this.playing = true;
      this.updateRequest = requestAnimationFrame(this.update.bind(this));
  }

  reset() {
      this.pause();

      forOf(this.layers, (key, value) => {
        this.layers[key].currentTransformation = {
          x: 0,
          y: 0,
          rotate: {
            x: 0,
            y: 0
          }
        }

        transform(value.elements, this.layers[key].currentTransformation);
      });
  }

  kill() {
    this.playing = false;
    cancelAnimationFrame(this.updateRequest);

    style(this.container, {
      perspective: ''
    });

    unresize(this.resizeCallback);
    off(this.container, 'mousemove', this.resizeCallback);
  }
}
