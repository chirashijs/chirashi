import forElements from '../core/for-elements'

export function setAttr (elements, attributes) {
  let attributesName = Object.keys(attributes)

  forElements(elements, (element) => {
    if (!element.setAttribute) return

    let i = attributesName.length, attributeName
    while(i--) {
      attributeName = attributesName[i]
      element.setAttribute(attributeName, attributes[attributeName])
    }
  })
}

export default setAttr
