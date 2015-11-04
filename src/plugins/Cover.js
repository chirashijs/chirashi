import { forEach, forElements, getElements } from '../core';
import { parent } from '../dom';
import { resize, unresize, load, watchProp, unwatchProp } from '../events';
import { style, size } from '../styles';
import { defaultify } from '../utils/defaultify';

export class Cover {
  constructor(options = {}) {
    this.options = options;

    this.items = [];

    if (this.options.items)
        forEach(this.options.items, (item) => {
          this.addElements(item);
        });

    this.resizeCallback = resize(this.resizeAll.bind(this));
  }

  addElements(item) {
    forElements(item.elements, (element) => {
      let index = this.items.push({
        element: element,
        mode: item.mode
      });

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

      let newItem = this.items[index-1];

      newItem.watcher = watchProp(element, 'src', (value) => {
          load(element, () => {
            this.resize(newItem);
          });
      });
    });
  }

  removeElements(elements) {
    forElements(elements, (element) => {
      size(element, {width:'', height: ''});

      style(parent(element), {
        position: '',
        overflow: ''
      });

      style(element, {
        position: '',
        top: '',
        left: ''
      });

      let i = this.items.length, found = false;
      while(!found && i--) {
          if (found = element == this.items[i].elements) {
              this.items.slice(i, 1);
          }
      }
    });
  }

  resizeAll() {
    forEach(this.items, this.resize.bind(this));
  }

  resize(item) {
      let ratio,
          imgWidth = item.element.naturalWidth,
          imgHeight = item.element.naturalHeight,
          parentSize = size(parent(item.element)),
          widthRatio = parentSize.width / imgWidth,
          heightRatio = parentSize.height / imgHeight;

      switch (item.mode) {
        case 'fill':
          ratio = Math.max(widthRatio, heightRatio);

          break;
        case 'fit':
          ratio = Math.min(widthRatio, heightRatio);

          break;

        default:
          ratio = 1;
      }

      size(item.element, {
        width: ratio * imgWidth,
        height: ratio * imgHeight
      });
  }

  kill() {
    unresize(this.resizeCallback);

    forEach(this.items, (item) => {
        size(item.element, {width: '', height: ''});

        unwatch(item.watcher);

        style(parent(item.element), {
          position: '',
          overflow: ''
        });

        style(item.element, {
          position: '',
          top: '',
          right: '',
          bottom: '',
          left: '',
          margin: ''
        });
    });

    this = null;
  }
};
