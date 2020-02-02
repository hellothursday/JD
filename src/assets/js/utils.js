function px2rem ($px) {
  const $rootFontSize = 375 / 10
  return parseFloat($px) / $rootFontSize + 'rem'
}

function animateCSS (node, animationName, callback) {
  node.classList.add('animated', 'fast', animationName)

  function handleAnimationEnd () {
    node.classList.remove('animated', 'fast', animationName)
    node.removeEventListener('animationend', handleAnimationEnd)

    if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

function deepClone (obj = {}) {
  if (typeof obj !== 'object' || obj == null) {
    // obj 是 null ，或者不是对象和数组，直接返回
    return obj
  }

  // 初始化返回结果
  let result
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    // 保证 key 不是原型的属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用！！！
      result[key] = deepClone(obj[key])
    }
  }

  // 返回结果
  return result
}

export {
  px2rem,
  animateCSS,
  deepClone
}
