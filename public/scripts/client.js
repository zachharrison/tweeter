/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

/************************************************************
                      HELPER FUNCTIONS
*************************************************************/

const escape = function(str) {

  let paragraph = document.createElement('paragraph');
  paragraph.appendChild(document.createTextNode(str));
  return paragraph.innerHTML;

}
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
    <p>${escape(tweet.content.text)}</p>
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
    $('#tweets-container').prepend(newTweet);
  }


};

// FETCH THE TWEETS FROM /TWEETS PAGE
const loadTweets = function() {

  $.ajax('/tweets', { method: 'GET' })
  .then(res => renderTweets(res))
  .catch(err => console.log(err));


};

// SEND FORM DATA TO SERVER WITH AJAX
const formSubmit = function() {

  $('.new-tweet form').on('submit', function(e){
    e.preventDefault();
    const tweetText = $('.new-tweet form #tweet-text').val();
    const tweet = $('.new-tweet form').serialize();

    if (tweetText.length > 140) {
      alert('Tweet is too long, please use up to 140 characters!');
    } else if (tweetText === '' || tweetText === null) {
      alert('Please enter a tweet');
    } else {

      $.ajax('/tweets' , { method: 'POST',  data: tweet})
      .then(res => {
        loadTweets();
        $('.new-tweet form textarea').val('')
        $('.counter').val(140);
      })
      .catch(err => console.log(err));

    }
  });

};


/************************************************************
                    DOCUMENT LOADED
*************************************************************/
$(document).ready(function() {

  loadTweets();
  formSubmit();

});

/* 

const tweet = {
  user: user,
  content: {
    text: req.body.text
  },
  created_at: Date.now()
};

$(function() {
  const $button = $('#load-more-posts');
  $button.on('click', function () {
    console.log('Button clicked, performing ajax call...');
    $.ajax('more-posts.html', { method: 'GET' })
    .then(function (morePostsHtml) {
      console.log('Success: ', morePostsHtml);
      $button.replaceWith(morePostsHtml);
    });
  });
}); 

*/


// e.preventDefault();
//     const tweetText = $('.new-tweet form #tweet-text').val();
//     const tweet = $('.new-tweet form').serialize();

//     if (tweetText.length > 140) {
//       alert('Tweet is too long, please use up to 140 characters!');
//     } else if (tweetText === '' || tweetText === null) {
//       alert('Please enter a tweet');
//     } else {

//       $.ajax('/tweets' , { method: 'POST',  data: tweet})
//       .then(res => {
//         $('.new-tweet form textarea').val('')
//         $('.counter').val(140);
//       })
//       .catch(err => console.log(err));

//     }
//     loadTweets();
