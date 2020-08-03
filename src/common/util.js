/**
 * 深拷贝
 * @param  {} to
 * @param  {} from
 */
function deepAssign(to, from) {
  for (const key in from) {
    if (!from[key] || typeof from[key] !== 'object') {
      to[key] = from[key]
    } else {
      to[key] = {}
      deepAssign(to[key], from[key])
    }
  }
}
/**
 * 生产随机id
 * @param  {} len
 * @param  {} radix
 */
function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = [],
    i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

/**
 * 解析获取url参数
 * @param  {} queryKey 需要解析的url参数
 */
function parseUrl(queryKey = '') {
  const queryObj = {}
  const search = window.location.search
  const reg = /([^?&=]+)=([^&]+)/g

  search.replace(reg, (_, key, value) => (queryObj[key] = value))

  return queryKey === '' ? queryObj : queryObj[queryKey]
}

/**
 * 删除url上的某个参数
 * @param  {} queryKey 需要删除的url参数
 */
function deleteUrlQuery(queryKey) {
  const baseUrl = window.location.origin + window.location.pathname + '?'
  const query = window.location.search.substr(1)
  if (query.indexOf(queryKey) > -1) {
    const queryObj = {}
    const queryArr = query.split('&')
    for (let i = 0; i < queryArr.length; i++) {
      queryArr[i] = queryArr[i].split('=')
      queryObj[queryArr[i][0]] = queryArr[i][1]
    }
    delete queryObj[queryKey]
    return (
      baseUrl +
      JSON.stringify(queryObj)
        .replace(/["{}]/g, '')
        .replace(/:/g, '=')
        .replace(/,/g, '&')
    )
  }
}

/**
 * 获取url中的source，返回对应的shareSource
 */
function getShareSource() {
  let source = parseUrl('source')

  if (source && /^share(\d)+$/.test(source)) {
    source = 'share' + (Number(source.slice(5)) + 1)
  } else {
    source = 'share0'
  }

  return source
}

/**
 * 是否是IOS
 */
function isIOS() {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

  return isiOS
}

/**
 * 是否是Android
 */
function isAndroid() {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端

  return isAndroid
}
/**
 * 是否是微信环境
 */
function isWechat() {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  const ua = window.navigator.userAgent.toLowerCase()
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  }
  return false
}

export { uuid, deepAssign, parseUrl, getShareSource, isWechat, isAndroid, isIOS, deleteUrlQuery }
