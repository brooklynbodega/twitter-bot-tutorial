// Tutorial based off: https://codeburst.io/build-a-simple-twitter-bot-with-node-js-in-just-38-lines-of-code-ed92db9eb078

// Require dependencies
let Twitter = require('twitter');
let config = require('./config.js');
// Pass configuration details into Twitter
let T = new Twitter(config);

// We’re going to set up a params variable which will house our search parameters.
// There are a lot of parameters we can use.
// Twitter’s API documentation:
// https://developer.twitter.com/en/docs/api-reference-index
// SPECIFIC: https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweet

let params = {
  // q is the only required parameter and it stores our search query.
  //  In my example we’re searching for tweets containing #nodejs.
  // Feel free to change this to whatever query you’d like.
  q: '#nodejs',
  // Specify the number of tweets you’d like to return
  count: 10,
  // Returns only the most recent results
  result_type: 'recent',
  lang: 'en'
}


// Using the npm Twitter module, we make a get request to ‘search/tweets’,
// passing our search params we set previously.
// This get request returns a callback.
//If there is no error in this callback, we will run our code to favorite a tweet.
// If there is an error, we will log the error and be done.
T.get('search/tweets', params, function (error, data, response) {
  if (!error) {
    // Loop through the returned tweets (data.statuses)
    for (let i = 0; i < data.statuses.length; i++) {
      // Get the tweet ID from the returned data
      let id = {
        id: data.statuses[i].id_str
      }
      // Try to Favorite the selected Tweet
      T.post('favorites/create', id, function (err, response) {
        // If the favorite is successful, log the url of the tweet
        if (!err) {
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
        }
        // If the favorite fails, log the error message
        else {
          console.log(err[0].message);
        }
      });
    }
  } else {
    console.log(error);
  }
})