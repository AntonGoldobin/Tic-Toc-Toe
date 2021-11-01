$(document).ready(function () {
  $("#burger").click(function () {
    $(".header").toggleClass("active");
    $(".burger").toggleClass("active");
  });
  $(".slick-blog").click({
    centerMode: true,
    centerPadding: 0,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: true,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0",
        },
      },
    ],
  });
});
