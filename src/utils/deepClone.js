/**
 * Return a deep clone of object.
 * @param {object} object - The object to clone
 * @return {object} clone - The clone of the object
 */
export default function deepClone (object) {
    if (object == null || typeof object !== 'object')
        return object

    let clone = object.constructor()
    for (let attr in object)
        if (object.hasOwnProperty(attr))
            clone[attr] = object[attr]

    return clone
}
