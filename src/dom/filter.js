import forElements from '../core/for-elements'

export default function filter (elements, tested) {
    let matching = []

    forElements(elements, (element) => {
        if (!!element && element !== window && element !== document && (typeof tested == 'string' && element.matches(tested) || element == tested))
            matching.push(element)
    })

    return matching
}
