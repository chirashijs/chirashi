/**
 * Copy all defaults properties to options.
 * @param {object} options - The received options
 * @param {object} defaults - The default values
 * @return {object} merge - The merged options
 */
export default function defaultify (options, defaults) {
    return Object.assign(options, defaults)
}
