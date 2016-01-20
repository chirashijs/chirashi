import resize from '../events/resize'
import unresize from '../events/unresize'

export class Breakpoint {
    _listeners = []

    constructor(breakpoints) {
        this.breakpoints = breakpoints

        this.resizeCallback = resize(this.resize.bind(this))
    }

    resize(size) {
        console.log(size, this.breakpoints)
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

export default Breakpoint
