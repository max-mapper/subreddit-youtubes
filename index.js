var request = require('request').defaults({json: true})
var stream = require('stream')
var url = require('url')
var qs = require('querystring')

module.exports = function(subreddit) {
  var last = ""
  var started = false
  var readStream = new stream.Readable({ objectMode: true })
  
  function importSubredditYoutubes(subreddit, next) {
    request(subreddit + "?after=" + last, function(e, r, body) {
      if (e) return next(e)
      last = body.data.after
      var count = 0
      var youtubes = body.data.children.forEach(function(item) {
        if (!item.data.media) return
        var oembed = item.data.media.oembed
        if (!oembed || oembed.provider_name !== "YouTube") return
        if (!oembed.url) return
        count++
        item._id = qs.parse(url.parse(oembed.url).query).v
        readStream.push(item)
      })
      readStream.emit('page', body.data, count)
      if (body.data.after) next()
      else readStream.push(null)
    })
  }
  
  // reddit doesnt want more than 1 request per 2 seconds
  function loop() {
    importSubredditYoutubes(subreddit, function(err) {
      if (err) return console.log(err)
      setTimeout(loop, 2000)
    })
  }
  
  readStream._read = function(n) {
    if (!started) loop()
    started = true
  }
  
  return readStream
}
