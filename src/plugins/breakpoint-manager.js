import forEach from '../core/for-each'
import forIn from '../core/for-in'

import BreakpointListener from './breakpoint-listener'

export class BreakpointManager extends BreakpointListener {
    constructor(breakpoints) {
        super(breakpoints)

        this._groups = {}
    }

    trigger() {
        if (this._groups) {
            forIn (this._groups, (group, behaviors) => {
                let disabled = []

                let i = behaviors.enabled.length
                while (i--) {
                    let behavior = behaviors.enabled[i]

                    if (behavior.sizes.indexOf(this.current) == -1) {
                        behavior.disable()
                        behaviors.enabled.splice(i, 1)
                        disabled.push(behavior)
                    }
                }

                let j = behaviors.disabled.length
                while (j--) {
                    let behavior = behaviors.disabled[j]

                    if (behavior.sizes.indexOf(this.current) != -1) {
                        behavior.enable()
                        behaviors.disabled.splice(j, 1)
                        behaviors.enabled.push(behavior)
                    }
                }

                behaviors.disabled = behaviors.disabled.concat(disabled)

                this._groups[group] = behaviors

            })
        }

        super.trigger()
    }

    addToGroup(group, behaviors) {
        let behaviorsGroup = this._groups[group]

        if (!behaviorsGroup) {
            behaviorsGroup = {
                disabled: [],
                enabled: []
            }
        }

        let i = behaviors.length
        while(i--) {
            let behavior = behaviors[i]

            if (behavior.sizes.indexOf(this.current) != -1) {
                behavior.enable()
                behaviorsGroup.enabled.push(behavior)
            }
            else {
                behaviorsGroup.disabled.push(behavior)
            }
        }

        this._groups[group] = behaviorsGroup
    }

    removeGroup(group) {
        if (!('group' in this._groups)) return

        forEach(this._groups[group].enabled, behavior => behavior.disable())

        delete this._groups[group]
    }

    kill() {
        forIn (this._groups, (group, behaviors) => {
            forEach(behaviors.enabled, behavior => behavior.disable())
        })

        super.kill()
    }
}

export default BreakpointManager
