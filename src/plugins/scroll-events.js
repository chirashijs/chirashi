import forEach from '../core/for-each';
import on from '../events/on';
import off from '../events/off';
import defaultify from '../utils/defaultify';

const defaults = {
	touchMult: 4, // Mutiply the touch action by two making the scroll a bit faster than finger movement
	firefoxMult: 15, // Firefox on Windows needs a boost, since scrolling is very slow
	keyStep: 120, // How many pixels to move with each key press
	mouseMult: 1, // General multiplier for all mousehweel including FF
	lethargy: false
};

const lethargyDefaults = {
	stability: 8,
	sensitivity: 100,
	tolerance: 1.1,
	delay: 150
}

function sum (a, b) {
	return a + b;
}

export class ScrollEvents {
	constructor (options) {
		this.options = defaultify(options, defaults);

		if (this.options.lethargy) {
			this.options.lethargy = defaultify(options, lethargyDefaults);

			this.lastUpDeltas = [];
			this.lastDownDeltas = [];
			this.deltasTimestamp = [];

			let i = this.options.lethargy.stability * 2;
			while(i--) {
				this.lastUpDeltas.push(null);
				this.lastDownDeltas.push(null);
				this.deltasTimestamp.push(null);
			}
		}

		this.listeners = [];
		this.eventsBound = false;

		this.isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

		this.event = {
			y: 0,
			x: 0,
			deltaX: 0,
			deltaY: 0,
			originalEvent: null
		};

		this.hasWheelEvent = 'onwheel' in document;
		this.hasMouseWheelEvent = 'onmousewheel' in document;
		this.hasTouch = 'ontouchstart' in document;
		this.hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
		this.hasPointer = !!window.navigator.msPointerEnabled;
		this.hasKeyDown = 'onkeydown' in document;
	}

	on (callback) {
		if (!this.eventsBound) this.bindEvents();

		this.listeners.push(callback);
	}

	off (callback) {
		this.listeners.slice(this.listeners.indexOf(callback), 1);
	}

	bindEvents() {
		if(this.hasWheelEvent) {
			this.onWheelCallback = this.onWheel.bind(this);
			document.addEventListener('wheel', this.onWheelCallback);
		}
		if(this.hasMouseWheelEvent) {
			this.onMouseWheelCallback = this.onMouseWheel.bind(this);
			document.addEventListener('mousewheel', this.onMouseWheelCallback);
		}

		if(this.hasTouch) {
			this.onTouchStartCallback = this.onTouchStart.bind(this);
			document.addEventListener('touchstart', this.onTouchStartCallback);
			this.onTouchMoveCallback = this.onTouchMove.bind(this);
			document.addEventListener('touchmove', this.onTouchMoveCallback);
		}

		if(this.hasPointer && this.hasTouchWin) {
			this.bodyTouchAction = document.body.style.msTouchAction;
			document.body.style.msTouchAction = 'none';
			this.onTouchStartCallback = this.onTouchStart.bind(this);
			document.addEventListener('MSPointerDown', this.onTouchStartCallback, true);
			this.onTouchMoveCallback = this.onTouchMove.bind(this);
			document.addEventListener('MSPointerMove', this.onTouchMoveCallback, true);
		}

		if(this.hasKeyDown) {
			this.onKeyDownCallback = this.onKeyDown.bind(this);
			document.addEventListener('keydown', this.onKeyDownCallback);
		}

		this.eventsBound = true;
	}

	unbindEvents() {
		if(this.hasWheelEvent) document.removeEventListener('wheel', this.onWheelCallback);
		if(this.hasMouseWheelEvent) document.removeEventListener('mousewheel', this.onMouseWheelCallback);

		if(this.hasTouch) {
			document.removeEventListener('touchstart', this.onTouchStartCallback);
			document.removeEventListener('touchmove', this.onTouchMoveCallback);
		}

		if(this.hasPointer && this.hasTouchWin) {
			document.body.style.msTouchAction = this.bodyTouchAction;
			document.removeEventListener('MSPointerDown', this.onTouchStartCallback, true);
			document.removeEventListener('MSPointerMove', this.onTouchMoveCallback, true);
		}

		if(this.hasKeyDown) document.removeEventListener('keydown', this.onKeyDownCallback);

		this.eventsBound = false;
	}

	notify (deltaX, deltaY, e) {
		if (this.options.lethargy) {
			this.deltasTimestamp.push(Date.now());
    		this.deltasTimestamp.shift();

			if (deltaY <= 0) {
				this.lastUpDeltas.push(deltaY);
				this.lastUpDeltas.shift();
			}
			else {
				this.lastDownDeltas.push(deltaY);
				this.lastDownDeltas.shift();
			}

			if (this.isInertia(deltaY <= 0)) return;
		}

		this.event.deltaX = deltaX;
		this.event.deltaY = deltaY;
		this.event.x += this.event.deltaX;
		this.event.y += this.event.deltaY;
		this.event.originalEvent = e;

		forEach(this.listeners, (listener) => {
			listener(this.event);
		});
	}

	isInertia(forward) {
		let lastDeltas = forward ? this.lastUpDeltas : this.lastDownDeltas;

		console.log((forward?'for':'back')+'ward', lastDeltas)
		if (lastDeltas[0] == null) {
			return false;
		}

		if (this.deltasTimestamp[this.options.lethargy.stability * 2 - 2] + this.options.lethargy.delay > Date.now()
		&& lastDeltas[0] == lastDeltas[this.options.lethargy.stability * 2 - 1]) {
			return true;
		}

		let lastDeltasOld = lastDeltas.slice(0, this.options.lethargy.stability);
		let lastDeltasNew = lastDeltas.slice(this.options.lethargy.stability, this.options.lethargy.stability * 2);

		let oldSum = lastDeltasOld.reduce(sum);
		let newSum = lastDeltasNew.reduce(sum);

		let oldAvg = oldSum / lastDeltasOld.length;
		let newAvg = newSum / lastDeltasNew.length;

		return !(Math.abs(oldAvg) < Math.abs(newAvg * this.options.lethargy.tolerance) && (this.options.lethargy.sensitivity < Math.abs(newAvg)));
	}

	onWheel(e) {
		// In Chrome and in Firefox (at least the new one)
		let deltaX = e.wheelDeltaX || e.deltaX * -1;
		let deltaY = e.wheelDeltaY || e.deltaY * -1;

		// for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
		// real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
		// if(isFirefox && e.deltaMode == 1) {
		if(this.isFirefox) {
			deltaX *= this.options.firefoxMult;
			deltaY *= this.options.firefoxMult;
		}

		deltaX *= this.options.mouseMult;
		deltaY *= this.options.mouseMult;

		this.notify(deltaX, deltaY, e);
	}

	onMouseWheel(e) {
		// In Safari, IE and in Chrome if 'wheel' isn't defined
		let deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
		let deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

		this.notify(deltaX, deltaY, e);
	}

	onTouchStart(e) {
		var t = (e.targetTouches) ? e.targetTouches[0] : e;
		this.touchStartX = t.pageX;
		this.touchStartY = t.pageY;
	}

	onTouchMove(e) {
		// e.preventDefault(); // < This needs to be managed externally
		var t = (e.targetTouches) ? e.targetTouches[0] : e;

		deltaX = (t.pageX - this.touchStartX) * this.options.touchMult;
		deltaY = (t.pageY - this.touchStartY) * this.options.touchMult;

		this.touchStartX = t.pageX;
		this.touchStartY = t.pageY;

		this.notify(deltaX, deltaY, e);
	}

	onKeyDown(e) {
		// 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
		let deltaX = 0;
		let deltaY = 0;

		switch(e.keyCode) {
			case 37:
				deltaX = -this.options.keyStep;
				break;
			case 39:
				deltaX = this.options.keyStep;
				break;
			case 38:
				deltaY = this.options.keyStep;
				break;
			case 40:
				deltaY = -this.options.keyStep;
				break;
			default:
				return;
		}

		this.notify(deltaX, deltaY, e);
	}

	destroy() {
		this.unbindEvents();
	}
}

export default SmoothEvents;
