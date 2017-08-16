
var tools = {
  /**
   * @desc 格式化url里面的参数
   */
  parseSearch: function () {
    var searchData = location.search
    if (!(searchData.indexOf('?') > -1)) return
    var curData = searchData.substring(1)
    var obj = {}
    if (curData.indexOf('&') > -1) {
      var curArrData = curData.split('&')
      for (var i = 0, len = curArrData.length; i < len; i++) {
        var data = curArrData[i].split('=')
        obj[data[0]] = data[1]
      }
    } else {
      var singleData = curData.split('=')
      obj[singleData[0]] = singleData[1]
    }
    return obj
  }
}

window.tools = tools
