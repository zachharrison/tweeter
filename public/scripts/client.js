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
        <small>${moment(tweet.created_at).fromNow()}</small>
        <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
        </div>
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

  $("#tweets-container").empty();

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

// ALERT ERROR MESSAGE IN DOM AND DISAPPEAR AFTER 3 SECONDS
const alertError = function(msg) {

  const div = document.createElement('div');
  const p = document.createElement('p');

  div.appendChild(p);
  p.appendChild(document.createTextNode(msg));
  div.classList.add('error');

  $('.new-tweet').prepend(div);

  setTimeout(function(){
    $('.error').remove();
  }, 3000);
};

// SEND FORM DATA TO SERVER WITH AJAX
const formSubmit = function() {

  $('.new-tweet form').on('submit', function(e){
    
    e.preventDefault();
    const tweetText = $('.new-tweet form #tweet-text').val();
    const tweet = $('.new-tweet form').serialize();

    if (tweetText.length > 140) {
      alertError('Tweet is too long, please use up to 140 characters!');
    } else if (tweetText === '' || tweetText === null) {
      alertError('Please enter a tweet');
    } else {

      $.ajax('/tweets' , { method: 'POST',  data: tweet})
      .then(res => {
        loadTweets();
        $('.new-tweet form input').val('')
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
