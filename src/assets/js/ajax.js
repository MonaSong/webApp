// jsonp
exports.ajax = (type, url, dataType) => {
  var promise = new Promise(function (resolve, reject) {
    var client = new XMLHttpRequest()
    client.open(type, url)
    client.onreadystatechange = handler
    client.responseType = dataType
    client.setRequestHeader('Accept', 'application/json')
    client.send()

    function handler () {
      if (this.readyState !== 4) return
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
  })
  return promise
}
