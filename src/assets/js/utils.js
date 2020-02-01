function px2rem ($px) {
  const $rootFontSize = 375 / 10
  return parseFloat($px) / $rootFontSize + 'rem'
}

export {
  px2rem
}
