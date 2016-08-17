function applyPropertyToMatrix (property, value, matrix) {
    switch (property) {
        case 'x':
        matrix[4] += value
        break

        case 'y':
        matrix[5] += value
        break

        case 'rotate':
        let cosValue = Math.cos(value),
        sinValue = Math.sin(value)
        matrix[0] *= cosValue
        matrix[1] += sinValue
        matrix[2] -= sinValue
        matrix[3] *= cosValue
        break

        case 'scale':
        matrix[0] *= value
        matrix[2] *= value
        break

        case 'scaleX':
        matrix[0] *= value
        break

        case 'scaleY':
        matrix[3] *= value
        break

        case 'skew':
        let tanValue = Math.tan(value)
        matrix[2] += tanValue
        matrix[1] += tanValue
        break

        case 'skewX':
        matrix[2] += Math.tan(value)
        break

        case 'skewY':
        matrix[1] += Math.tan(value)
        break
    }
}

/**
 * Convert a transformation as object to a 2d matrix as object
 * @param {object} transformation - The transformation object
 * @return {Array} matrix - The 2d matrix
 */
export default function transformTo2DMatrix(transformation) {
    let properties = Object.keys(transformation),
        i          = properties.length,
        matrix     = [
                        1, 0,
                        0, 1,
                        0, 0
                    ]

    while(i--) {
        let property = properties[i],
            value    = transformation[property]

        if (typeof value == 'object') {
            let subProperties = Object.keys(value),
                j             = subProperties.length

            while (j--) {
                let subProperty = subProperties[j]
                applyPropertyToMatrix(property+subProperty.toUpperCase(), value[subProperty], matrix)
            }
        }
        else {
            applyPropertyToMatrix(property, value, matrix)
        }
    }

    return matrix
}
