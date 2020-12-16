$(document).ready(function() {

  $('textarea').on('input', function() {
    const maxLength = 140;
    const curLength = $(this).val().length;
    const lenDisplay = maxLength - curLength;

    $('.counter').val(lenDisplay);

    if (lenDisplay < 1) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', '#333');
    }

  });

});

