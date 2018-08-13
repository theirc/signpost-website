(function($) {
  "use strict"; // Start of use strict

  // Closes the sidebar menu
  $(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
    $(this).toggleClass("active");
  });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('#sidebar-wrapper .js-scroll-trigger').click(function() {
    $("#sidebar-wrapper").removeClass("active");
    $(".menu-toggle").removeClass("active");
    $(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times");
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

})(jQuery); // End of use strict

// Disable Google Maps scrolling
// See http://stackoverflow.com/a/25904582/1607849
// Disable scroll zooming and bind back the click event
var onMapMouseleaveHandler = function(event) {
  var that = $(this);
  that.on('click', onMapClickHandler);
  that.off('mouseleave', onMapMouseleaveHandler);
  that.find('iframe').css("pointer-events", "none");
}
var onMapClickHandler = function(event) {
  var that = $(this);
  // Disable the click handler until the user leaves the map area
  that.off('click', onMapClickHandler);
  // Enable scrolling zoom
  that.find('iframe').css("pointer-events", "auto");
  // Handle the mouse leave event
  that.on('mouseleave', onMapMouseleaveHandler);
}
// Enable map zooming with mouse scroll when the user clicks the map
$('.map').on('click', onMapClickHandler);


//image parallax start

$('.img-parallax').each(function(){
var img = $(this);
var imgParent = $(this).parent();
function parallaxImg () {
  var speed = img.data('speed');
  var imgY = imgParent.offset().top;
  var winY = $(this).scrollTop();
  var winH = $(this).height();
  var parentH = imgParent.innerHeight();


  // The next pixel to show on screen
  var winBottom = winY + winH;

  // If block is shown on screen
  if (winBottom > imgY && winY < imgY + parentH) {
    // Number of pixels shown after block appear
    var imgBottom = ((winBottom - imgY) * speed);
    // Max number of pixels until block disappear
    var imgTop = winH + parentH;
    // Porcentage between start showing until disappearing
    var imgPercent = ((imgBottom / imgTop) * 200) + (10 - (speed * 50));
  }
  img.css({
    top: imgPercent + '%',
    transform: 'translate(-50%, -0' + imgPercent + '%)'
  });
}
$(document).on({
  scroll: function () {
    parallaxImg();
  }, ready: function () {
    parallaxImg();
  }
});
});
