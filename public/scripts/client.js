/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

/************************************************************
                      HELPER FUNCTIONS
*************************************************************/

// TAKE IN TWEET OBJECT AND RETURN THE ENTIRE HTML STRUCTURE OF THE TWEET
const createTweetElement = function(tweet) {

  const $tweet = $(
    `<article class="tweet">
    <header>
      <div>
        <img class="profile-img" src=${tweet.user.avatars} alt="">
        <p class="name">${tweet.user.name}</p>
      </div>
      <p class="username">${tweet.user.handle}</p>
    </header>
    <main class="tweet-content">
      <p>${tweet.content.text}</p>
    </main>
    <footer>
      <div class="footer-container">
        <small>${tweet.created_at} days ago</small>
        <small class="icons">🏴 🔂 ❤️</small>
      </div>
    </footer>`
  );

  return $tweet;
};

/* 
  LOOP THROUGH TWEETS, CALL CREATETWEETELEMENT FUNCTION
  FOR EACH TWEET AND APPEND TO THE DOM
*/
const renderTweets = function(tweets) {

  for (const tweet of tweets) {
    const newTweet = createTweetElement(tweet);
    $('#tweets-container').append(newTweet);
  }


};

/************************************************************
                    DOCUMENT LOADED
*************************************************************/
$(document).ready(function() {
  
  renderTweets(tweetData);
  

});