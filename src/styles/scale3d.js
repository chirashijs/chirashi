import forElements from '../core/for-elements'

const prefix = '-'+(Array.prototype.slice
  .call(window.getComputedStyle(document.documentElement, ''))
  .join('')
  .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
)[1]+'-'

export function scale3d (elements, transformation, keep) {
  forElements(elements, (element) => {
    if (!element.style) return

    let style = 'scale3d('+ (transformation.scaleX || transformation.scale || 1) +','+ (transformation.scaleY || transformation.scale || 1) +','+ (transformation.scaleZ || 1) +')'

    if (keep) {
        let newStyle = element.style[prefix+'transform'] || element.style.transform
        newStyle += ' ' + style
        element.style[prefix+'transform'] = newStyle
        element.style.transform = newStyle
    }
    else element.style[prefix+'transform'] = element.style.transform = style
  })
}

export default scale3d
