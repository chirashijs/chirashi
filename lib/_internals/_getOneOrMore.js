import forEach from '../core/forEach'

export default function _getOneOrMore (args, execute) {
  if (args.length === 1) {
    return execute(args[0])
  } else {
    const ret = {}
    forEach(args, _injectIntoObject.bind(null, ret, execute))

    return ret
  }
}

function _injectIntoObject (ret, execute, arg) {
  ret[arg] = execute(arg)
}
