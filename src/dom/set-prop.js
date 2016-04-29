import forElements from '../core/for-elements'
import forIn from '../core/for-in'

/**
 * Set properties from props object keys to values on elements
 * @param {string | Array | NodeList | HTMLCollection} elements - The iterable or selector
 * @param {Object} props - properties names and values association
 * @return {string | Array | NodeList | HTMLCollection} elements - The iterable for chaining
 */
export default function setProp (elements, props) {
    let propsName = Object.keys(props)

    return forElements(elements, element => {
        let i = propsName.length, propName
        while(i--) {
            propName = propsName[i]
            element[propName] = props[propName]
        }
    })
}
