$( document ).ready(function(){
  $(".dropdown-trigger").dropdown({hover: false});
});

var instance = M.Carousel.init({
  fullWidth: true
});

// Or with jQuery

$('.carousel.carousel-slider').carousel({
  fullWidth: true
});
