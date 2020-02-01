import Vue from 'vue'

Vue.filter('formatPrice', function (price) {
  if (!price) {
    return ''
  }

  let result = parseFloat(price)
  return Number.isInteger(result) ? result : result.toFixed(2)
})

Vue.filter('formatTime', function (time) {
  if (!time) {
    return ''
  }
  if (time.indexOf(':') === -1) {
    return time
  }

  let result = ''
  const arr = time.split(':')
  if (parseInt(arr[0]) < 10) {
    result += '0' + arr[0]
  } else {
    result += arr[0]
  }

  if (parseInt(arr[1]) < 10) {
    result += ':0' + arr[1]
  } else {
    result += ':' + arr[1]
  }
  if (parseInt(arr[2]) < 10) {
    result += ':0' + arr[2]
  } else {
    result += ':' + arr[2]
  }
  return result
})
