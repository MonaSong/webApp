var reset = {
  _rem: function (designWidth) {
    var sWidth = screen.width
    var sScrollWidth = document.body.scrollWidth
    var sDeviceRatio = window.devicePixelRatio
    var oHtml = document.getElementsByTagName('html')[0]

    if (sWidth > sScrollWidth) {
      if (sWidth / sDeviceRatio / 4 < 85.3) {
        oHtml.style.fontSize = sWidth / sDeviceRatio / 4 + 'px'
      } else {
        oHtml.style.fontSize = '85.3px'
      }
    } else {
      // oHtml.style.fontSize = screen.width / 4 + 'px'
      if (screen.width < designWidth || sDeviceRatio > 2) {
        oHtml.style.fontSize = screen.width / 4 + 'px'
      } else {
        oHtml.style.fontSize = '85.3px'
      }
    }
  }
}

// reset rem
reset._rem(400)

window.onresize = function () {
  reset._rem(400)
}
