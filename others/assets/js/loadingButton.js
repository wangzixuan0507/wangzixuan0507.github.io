(function() {
  var fakeLoad, gray, green, incLoad, orange, percentage, updown;

  percentage = 0;

  updown = true;

  gray = $('#animatedText');

  orange = $('#animatedBackground');


  incLoad = function() {
    gray.attr('data-loader', Math.floor(percentage));
    orange.css({
      'width': percentage + '%'
    });

    if (percentage >= 100) {
      updown = false;
    } else if (percentage <= 0){
      updown = true;
    }

    if (updown) {
      percentage += Math.random() / 2;
    } else {
      percentage -= Math.random() / 2;
    }
  };

  fakeLoad = window.setInterval(incLoad, 10);

}).call(this);