import { forEach, forElements, getElements } from '../core';
import { parent } from '../dom';
import { resize, unresize, load } from '../events';
import { size } from '../styles';
import { defaultify } from '../utils/defaultify';

const defaults = {};

export class Cover {
  constructor(options) {
    this.options = defaultify(options, defaults);

    this.addElements(this.options.elements);
    this.elements = [];

    this.resizeCallback = resize(this.resizeAll.bind(this));
  }

  addElements(elements) {
    forElements(elements, (element) => {
      this.elements.push(element);

      style(parent(element), {
        position: 'relative',
        overflow: 'hidden'
      });

      style(element, {
        position: 'absolute',
        top: '-9999px',
        right: '-9999px',
        bottom: '-9999px',
        left: '-9999px',
        margin: 'auto'
      });
    });
  }

  removeElements(elements) {
    forElements(elements, (element) => {
      size(element, {width:'', height: ''});

      let index = this.elements.indexOf(element);
      if (index != -1) this.elements.splice(index, 1);

      style(parent(element), {
        position: '',
        overflow: ''
      });

      style(element, {
        position: '',
        top: '',
        right: '',
        bottom: '',
        left: '',
        margin: ''
      });
    });
  }

  resizeAll() {
    forEach(this.elements, this.resize.bind(this));
  }

  resize(element) {
      let ratio,
          imgWidth = element.naturalWidth,
          imgHeight = element.naturalHeight,
          parentSize = size(parent(element)),
          widthRatio = parentSize.width / imgWidth,
          heightRatio = parentSize.height / imgHeight;

      switch (this.options.type) {
        case 'fill':
          ratio = Math.max(widthRatio, heightRatio);

          break;
        case 'fit':
          ratio = Math.min(widthRatio, heightRatio);

          break;

        default:
          ratio = 1;
      }

      size(element, {
        width: ratio * imgWidth,
        height: ratio * imgHeight
      });
  }

  kill() {
    unresize(this.resizeCallback);

    size(this.elements, {width:'', height: ''});

    forEach(this.elements, (element) => {
        style(parent(element), {
          position: '',
          overflow: ''
        });

        style(element, {
          position: '',
          top: '',
          right: '',
          bottom: '',
          left: '',
          margin: ''
        });
    });
  }
};
