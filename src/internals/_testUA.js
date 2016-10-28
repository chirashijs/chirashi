import ua from '../browser/ua'
import vendor from '../browser/vendor'

export default function _testUA (uaRegex, vendorRegex) {
  return (new RegExp(`/${uaRegex}/i`)).test(ua) && (!vendorRegex || (new RegExp(`/${vendorRegex}/`)).test(vendor))
}
