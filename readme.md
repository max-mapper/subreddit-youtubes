# subreddit-youtubes

scrape a subreddit (including all history) for submissions that are youtube videos

## install

```
npm install subreddit-youtubes
```

## example

```
require('subreddit-youtubes')('http://www.reddit.com/r/Documentaries.json')
  .on('data', function(obj) {
    // obj is the full submission JSON from reddit
  })
  .on('end', function() {

  })
  .on('error', function(err) {

  })
  .on('page', function(obj, count) {
    // obj is the JSON data for the current page
    // count is the number of youtube videos on the current page
  })
```

## license

BSD