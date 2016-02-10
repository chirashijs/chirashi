import raf from 'raf'

import forEach from '../core/for-each'
import forElements from '../core/for-elements'
import getElement from '../core/get-element'

import closest from '../dom/closest'
import append from '../dom/append'
import remove from '../dom/remove'
import addClass from '../dom/add-class'
import removeClass from '../dom/remove-class'
import parent from '../dom/parent'
import find from '../dom/find'

import style from '../styles/style'
import height from '../styles/height'
import width from '../styles/width'
import size from '../styles/size'
import translate from '../styles/translate'
import offset from '../styles/offset'
import screenPosition from '../styles/screen-position'
import hide from '../styles/hide'
import show from '../styles/show'

import drag from '../events/drag'
import undrag from '../events/undrag'
import resize from '../events/resize'
import unresize from '../events/unresize'

import defaultify from '../utils/defaultify'
import range from '../utils/range'

import ScrollEvents from './scroll-events'

let defaults = {
  direction: 'auto',
  ease: 0.2,
  autoEase: 0.08,
  fixed: []
}

export class SmoothScroller {
  constructor(config) {
    if (typeof config == 'string') config = {element: config}

    this.config = defaultify(config, defaults)

    this.element = getElement(this.config.element)

    this.ease = this.config.ease
    this.autoEase = this.config.autoEase
    this.scrollEnabled = true

    this.parent = parent(this.element)
    addClass(this.parent, 'smooth-scroll-container')
    style(this.parent, {
      overflow: 'hidden',
      position: 'relative'
    })

    style(this.element, {
      position: 'absolute',
      top: 0,
      left: 0
    })

    this.scroll = { x: 0, y: 0 }
    this.target = { x: 0, y: 0 }

    if (this.config.scrollbar && (this.config.direction == 'auto' || this.config.direction == 'vertical')) {
      let scrollbarElement = append(this.parent, '<div class="scrollbar vertical"></div>'),
          cursorElement = append(scrollbarElement, '<div class="cursor"></div>')

      if (!this.scrollbar) this.scrollbar = {}
      this.scrollbar.vertical = {
        bar: scrollbarElement,
        cursor: cursorElement
      }

      let handleScrollCursor = (position) => {
        let ratio = range((position.y - screenPosition(scrollbarElement).top - this.scrollbar.vertical.cursorSize/2) / (this.scrollbar.vertical.barSize - this.scrollbar.vertical.cursorSize))
        this.setNewTarget({
            y: ratio * this.scrollableSize.height
        })

        this.updateIfNeeded()
      }

      this.dragVCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor)
    }

    if (this.config.scrollbar && (this.config.direction == 'auto' || this.config.direction == 'horizontal')) {
      let scrollbarElement = append(this.parent, '<div class="scrollbar horizontal"></div>'),
          cursorElement = append(scrollbarElement, '<div class="cursor"></div>')

      if (!this.scrollbar) this.scrollbar = {}
      this.scrollbar.horizontal = {
        bar: scrollbarElement,
        cursor: cursorElement
      }

      let handleScrollCursor = (position) => {
        let ratio = range((position.x - screenPosition(scrollbarElement).left - this.scrollbar.horizontal.cursorSize/2) / (this.scrollbar.horizontal.barSize - this.scrollbar.horizontal.cursorSize))
        this.setNewTarget({
            x: ratio * this.scrollableSize.width
        })

        this.updateIfNeeded()
      }

      this.dragHCallbacks = drag(scrollbarElement, handleScrollCursor, handleScrollCursor)
    }

    this.updateCallbacks = []
    this.scrollCallbacks = []
    this.resizeCallbacks = []

    this.localCallback = this.scrolling.bind(this)
    this.scrollEvents = new ScrollEvents()
    this.scrollEvents.on(this.localCallback)

    this.fixed = []
    this.fixElements(this.config.fixed)

    this.resizeCallback = this.resize.bind(this)
    resize(this.resizeCallback)

    raf(this.resize.bind(this))
  }

  scrolling(event) {
    if (!('yRatio' in this)) this.computeRatio()

    if (!this.scrollEnabled) return

    let deltaX = 0, deltaY = 0

    if (this.config.direction == 'auto') {
        deltaX = event.deltaX
        deltaY = event.deltaY
    }
    else {
        let delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY

        if (this.config.direction == 'horizontal')
            deltaX = delta
        else
            deltaY = delta
    }

    this.setNewTarget({
        x: this.scroll.x - deltaX,
        y: this.scroll.y - deltaY
    })

    this.triggerCallbacks('scroll')

    this.updateIfNeeded()
  }

  updateIfNeeded() {
      if (!this.updating && (Math.abs(this.delta.y) > 0.1 || Math.abs(this.delta.x) > 0.1))
          this.update()
  }

  update() {
      let dx = this.target.x - this.scroll.x,
          dy = this.target.y - this.scroll.y,
          ease = this.autoScroll ? this.config.autoEase : this.config.ease

      if (!(this.updating = Math.abs(dy) > 0.1 || Math.abs(dx) > 0.1)) {
          if (this.autoScroll) {
            this.scrollEnabled = true
            this.autoScroll = false
          }

          return
      }

      this.scroll.x += dx * ease
      this.scroll.y += dy * ease

      translate(this.element, {
        x: -this.scroll.x,
        y: -this.scroll.y
      })

      forEach(this.fixed, (fixed) => {
        if (!fixed.update) return

        translate(fixed.element, {
            x: this.scroll.x - fixed.initial.x,
            y: this.scroll.y - fixed.initial.y
        })
      })

      this.computeRatio()

      if (this.scrollbar && this.scrollbar.horizontal) {
        translate(this.scrollbar.horizontal.cursor, {
          x: this.xRatio * (this.scrollbar.horizontal.barSize - this.scrollbar.horizontal.cursorSize)
        })
      }

      if (this.scrollbar && this.scrollbar.vertical) {
        translate(this.scrollbar.vertical.cursor, {
          y: this.yRatio * (this.scrollbar.vertical.barSize - this.scrollbar.vertical.cursorSize)
        })
      }

      this.triggerCallbacks('update')

      this.updateRequest = raf(this.update.bind(this))
  }

  triggerCallbacks(type) {
    let callbacks = this[type+'Callbacks']
    let i = callbacks.length
    while(i--) callbacks[i](this.target)
  }

  on(events, callback) {
    switch (events) {
        case 'scroll':
        this.scrollCallbacks.push(callback)

        break

        case 'update':
        this.updateCallbacks.push(callback)

        break

        case 'resize':
        this.resizeCallbacks.push(callback)

        break
    }
  }

  off(events, callback) {
    switch (events) {
        case 'scroll':
        this.scrollCallbacks.splice(this.scrollCallbacks.indexOf(callback))

        break

        case 'update':
        this.updateCallbacks.splice(this.updateCallbacks.indexOf(callback))

        break

        case 'resize':
        this.resizeCallbacks.splice(this.resizeCallbacks.indexOf(callback))

        break
    }
  }

  immediateScroll(target) {
      this.setNewTarget(target)

      this.scroll = this.target

      translate(this.element, {
        x: -this.scroll.x,
        y: -this.scroll.y
      })
  }

  scrollTo(target) {
      this.scrollEnabled = false
      this.autoScroll = true
      this.setNewTarget(target)

      this.updateIfNeeded()
  }

  setNewTarget(target) {
      this.target = {
          x: 'x' in target ? Math.min(Math.max(target.x, 0), this.scrollableSize.width) : this.target.x,
          y: 'y' in target ? Math.min(Math.max(target.y, 0), this.scrollableSize.height) : this.target.y
      }

      this.delta = {
          x: -(this.target.x - this.scroll.x),
          y: -(this.target.y - this.scroll.y)
      }
  }

  computeRatio() {
    this.xRatio = this.scrollableSize.width ? this.scroll.x / this.scrollableSize.width : -1
    this.yRatio = this.scrollableSize.height ? this.scroll.y / this.scrollableSize.height : -1
  }

  refreshScrollbars() {
      if (!this.scrollbar) return

      if (this.scrollbar.vertical) {
        let ratio = range(this.parentSize.height / this.elementSize.height)
        this.scrollbar.vertical.barSize = height(this.scrollbar.vertical.bar)
        this.scrollbar.vertical.cursorSize = ratio * this.scrollbar.vertical.barSize
        height(this.scrollbar.vertical.cursor, ratio*100+'%')

        if (ratio == 1 || ratio == 0) hide(this.scrollbar.vertical.bar)
        else show(this.scrollbar.vertical.bar)
      }

      if (this.scrollbar.horizontal) {
        let ratio = range(this.parentSize.width / this.elementSize.width)
        this.scrollbar.horizontal.barSize = width(this.scrollbar.horizontal.bar)
        this.scrollbar.horizontal.cursorSize = ratio * this.scrollbar.horizontal.barSize
        width(this.scrollbar.horizontal.cursor, ratio*100+'%')

        if (ratio == 1 || ratio == 0) hide(this.scrollbar.horizontal.bar)
        else show(this.scrollbar.horizontal.bar)
      }
  }

  resize() {
      this.elementSize = size(this.element)
      this.parentSize = size(this.parent)

      this.scrollableSize = {
          width: Math.max(this.elementSize.width - this.parentSize.width, 0),
          height: Math.max(this.elementSize.height - this.parentSize.height, 0)
      }

      this.computeRatio()

      if(this.elementSize.height - this.scroll.y < this.parentSize.height) {
          this.yRatio = 1.0
          this.target.y = this.scroll.y = this.yRatio * this.scrollableSize.height
      }

      if(this.elementSize.width - this.scroll.x < this.parentSize.width) {
          this.xRatio = 1.0
          this.target.x = this.scroll.x = this.xRatio * this.scrollableSize.width
      }

      this.refreshScrollbars()

      this.triggerCallbacks('resize')
  }

  fixElements(elements) {
    forElements(elements, (element) => {
      let index = this.fixed.indexOf(element)

      if (index == -1) {
        let elOffset = offset(element)

        this.fixed.push({
          update: true,
          element: element,
          initial: this.scroll
        })
      }
      else {
          this.fixed[index].update = true
      }
    })
  }

  unfixElements(elements, keepTransform = false) {
    forElements(elements, (element) => {
      let i = this.fixed.length, done = false

      let index = this.indexOf(element)

      if (!keepTransform) {
          this.fixed.splice(index, 1)

          style(element, {
            position: '',
            transform: ''
          })
      }
      else {
          this.fixed[index].update = false
      }
    })
  }

  enableScroll() {
    this.scrollEnabled = true
  }

  disableScroll() {
    this.scrollEnabled = false
  }

  kill() {
      this.scrollEnabled = false
      this.updating = false

      raf.cancel(this.updateRequest)
      this.scrollEvents.off(this.localCallback)

      removeClass(this.parent, 'smooth-scroll-container')
      style(this.parent, {
        overflow: '',
        position: ''
      })

      style(this.element, {
        position: '',
        top: '',
        left: ''
      })

      forEach(this.fixed, fixed => {
        style(fixed.element, {
          transform: ''
        })
      })

      remove(find(this.parent, '.scrollbar'))

      undrag(this.dragVCallbacks)
      undrag(this.dragHCallbacks)
  }
}

export default SmoothScroller
