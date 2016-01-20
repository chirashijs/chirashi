import forOf from '../core/for-of'
import resize from '../events/resize'
import unresize from '../events/unresize'

export class BreakpointListener {
    current      = ''
    _listeners   = []
    _breakpoints = []

    constructor(breakpoints) {
        forOf(breakpoints, (key, value) => {
            this._breakpoints.push({
                size: value,
                label: key
            })
        })

        this._breakpoints.sort((a, b) => a.size > b.size)

        this.resizeCallback = resize(this.resize.bind(this))

        this.resize({
            width: window.innerWidth
        })
    }

    resize(size) {
        let width = size.width,
            i = this._breakpoints.length

        while(i-- && this._breakpoints[i].size > width){}

        i = Math.max(i, 0)

        let label = this._breakpoints[i].label

        if (label != this.current) {
            this.current = label

            for (let listener of this._listeners) {
                listener(label)
            }
        }
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
