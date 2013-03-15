require('./')('http://www.reddit.com/r/Documentaries.json')
  .on('data', function(obj) {
    // console.log(obj)
  })
  .on('end', function() {
    console.log('end')
  })
  .on('error', function(err) {
    console.log('err', err)
  })