$(document).ready(function(){
  $(".tabs li").click(function(){
    let target = $(this).data("target");

    // Highlight active tab
    $(".tabs li").removeClass("active");
    $(this).addClass("active");

    // Smooth scroll to section
    $("html, body").animate({
      scrollTop: $(target).offset().top - 70
    }, 800);

    // Animate section display
    $("section").removeClass("active");
    $(target).addClass("active");
  });

  // Default active state
  $(".tabs li:first").addClass("active");
  $("#section1").addClass("active");
});
