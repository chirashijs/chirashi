import { matrix } from './matrix';
import { scale } from './scale';
import { translate } from './translate';

export function transform (elements, transformation) {
    if (transformation.skew || transformation.skewX || transformation.skewY || transformation.rotate || transformation.rotateX || transformation.rotateY || transformation.rotateZ) {
        matrix(elements, transformation);
    }
    else {
        let shouldKeep = false;

        if (shouldKeep = (transformation.x || transformation.y || transformation.z)) {
            translate(elements, transformation);
        }

        if (scale.x || scale.y || scale.z) {
            scale(elements, transformation, shouldKeep);
        }
    }
}
