import forIn from '../core/for-in'
import resize from '../events/resize'
import unresize from '../events/unresize'

export class BreakpointListener {
    constructor(breakpoints) {
        this._current     = ''
        this._listeners   = []
        this._breakpoints = []

        forIn(breakpoints, (key, value) => {
            this._breakpoints.push({
                size: value,
                label: key
            })
        })

        this._breakpoints.sort((a, b) => b.size - a.size)

        this.resizeCallback = resize(this.resize.bind(this))

        this.resize({
            width: window.innerWidth
        })
    }

    set current(value) {
        if (this._current == value) return

        this._current = value

        this.trigger()
    }

    get current() {
        return this._current
    }

    trigger() {
        for (let listener of this._listeners) {
            listener(this._current)
        }
    }

    resize(size) {
        let width = size.width,
            len = this._breakpoints.length,
            i = 0

        while(i+1 < len && this._breakpoints[i+1].size > width) ++i

        this.current = this._breakpoints[Math.max(i, 0)].label
    }

    on(callback) {
        this._listeners.push(callback)
    }

    off(callback) {
        this._listeners.splice(this._listeners.indexOf(callback), 1)
    }

    kill() {
        unresize(this.resizeCallback)
    }
}

export default BreakpointListener
