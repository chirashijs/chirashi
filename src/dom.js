import * as Core from './core';

export function getAttr (element, name) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element.getAttribute && element.getAttribute(name);
}

export function setAttr (elements, attributes) {
  let attributesName = Object.keys(attributes);

  Core.forEach(elements, (element) => {
    if (!element.setAttribute) return;

    let i = attributesName.length, attributeName;
    while(i--) {
      attributeName = attributesName[i];
      element.setAttribute(attributeName, attributes[attributeName]);
    }
  });
}

export function removeAttr (elements, name) {
  Core.forEach(elements, (element) => {
    if (!element.removeAttribute) return;

    element.removeAttribute(name);
  });
}

export function attr (elements, option) {
  if (typeof option == 'object') {
    setAttr(elements, option);
  }
  else {
    return getAttr(elements, option);
  }
}

export function getData (element, name) {
  return getAttr(element, 'data-'+name);
}

export function setData (elements, attributes) {
  let attributesName = Object.keys(attributes);

  Core.forEach(elements, (element) => {
    if (!element.setAttribute) return;

    let i = attributesName.length, attributeName;
    while(i--) {
      attributeName = attributesName[i];
      element.setAttribute('data-'+attributeName, attributes[attributeName]);
    }
  });
}

export function removeData (elements, name) {
  return removeAttr(elements, 'data-'+name);
}

export function data (elements, option) {
  if (typeof option == 'object') {
    setData(elements, option);
  }
  else {
    return getData(elements, option);
  }
}



export function getProp (element, name) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element[name];
}

export function setProp (elements, props) {
  let propsName = Object.keys(props);

  Core.forEach(elements, (element) => {
    let i = propsName.length, propName;
    while(i--) {
      propName = propsName[i];
      element[propName] = props[propName];
    }
  });
}

export function prop (elements, option) {
  if (typeof option == 'object') {
    setProp(elements, option);
  }
  else {
    return getProp(elements, option);
  }
}




export function getHtml (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element.innerHTML;
}

export function setHtml (elements, string) {
  Core.forEach(elements, (element) => {
    element.innerHTML = string;
  });
}

export function html (elements, string) {
  if (typeof string == 'string') {
    setHtml(elements, string);
  }
  else {
    return getHtml(elements);
  }
}

export function empty (elements) {
  setHtml(elements, '');
}



export function addClass (elements, classes) {
  classes = classes.split(' ');

  Core.forEach(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.add(classes[i]);
  });
}

export function removeClass (elements, classes) {
  classes = classes.split(' ');

  Core.forEach(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.remove(classes[i]);
  });
}

export function toggleClass (elements, classes) {
  classes = classes.split(' ');

  Core.forEach(elements, (element) => {
    if (!element.classList) return;

    let i = classes.length;
    while(i--) element.classList.toggle(classes[i]);
  });
}

export function hasClass (element, classes) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element || !element.classList) return;

  classes = classes.split(' ');

  let i = classes.length, found = false;
  while(i-- && (found = element.classList.contains(classes[i]))) {}

  return found;
}

export function parent (element, selector) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element.parentNode;
}

export function closest (element, selector) {
  if (typeof element == 'string') element = Core.get(element);

  return (!(element instanceof HTMLElement)
    ? null
    : (element.matches(selector)
      ? element
      : parent(element.parentNode, selector)));
}


export function find (element, selector) {
  return element && [].slice.call(element.querySelectorAll(selector));
}

export function prev (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element.previousElementSibling;
}

export function next (element) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element) return;

  return element.nextElementSibling;
}


export function append (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  Core.forEach(elements, (element) => {
    if (!element.appendChild) return;

    element.appendChild(node);
  });
}

export function insertBefore (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  Core.forEach(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.insertBefore(node, element);
  });
}

export function insertAfter (elements, node) {
  if (typeof node == 'string') node = createElement(node);

  Core.forEach(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.insertBefore(node, element.nextElementSibling);
  });
}

export function clone (element) {
  if (typeof element == 'string') element = Core.get(element);

  return element && element.cloneNode(true);
}

export function remove (elements) {
  Core.forEach(elements, (element) => {
    if (!element.parentNode) return;

    element.parentNode.removeChild(element);
  });
}

export function createElement (string) {
  let temp = document.createElement('div');
  temp.innerHTML = string;
  return temp.firstChild;
}

export function index (element) {
  if (typeof element == 'string') element = Core.get(element);
  if (!element) return;

  let currentElement = element,
      parent = element.parentNode,
      i = 0;

  while (currentElement.previousElementSibling) {
      ++i;
      currentElement = currentElement.previousElementSibling;
  }

  return element === parent.children[i] ? i : -1;
}
