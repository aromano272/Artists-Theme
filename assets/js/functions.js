$(function() {
  smoothScroll(300);
  workBelt();
  workLoad();
  clientStuff();
});

// smoothScroll function is applied from the document ready function
var smoothScroll = function(duration) {
  $('a[href^="#"').on('click', function(event) {
    var target = $( $(this).attr('href') );

    if(target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, duration);
    }
  });
}

var workBelt = function() {

  $(".trigger").remove();
  $(".return").remove();

  $(".thumb-unit").on("click", function() {
    $(".work-belt").addClass("slided");
    $(".work-container").show();
  });

  $(".work-return").on("click", function() {
    $(".work-belt").removeClass("slided");
    $(".work-container").hide(300);
  })
}

var workLoad = function() {

  $.ajaxSetup({ cache: true });

  $(".thumb-unit").click(function() {

    var $this = $(this),
        newTitle = $this.find("strong").text(),
        newFolder = $this.data("folder"),
        spinner = "<div class='loader'>Loading...</div>",
        newHTML = "/sections/work/" + newFolder;

    $(".project-load").html(spinner).load(newHTML);
    $(".project-title").text(newTitle);

  })

}


var clientStuff = function() {

  $(".client-unit:first-child, .client-logo:first-child, .clients-mobile-nav span:first-child").addClass("active-client");

  $(".client-logo, .clients-mobile-nav span").click(function() {
    var $this = $(this),
        $siblings = $this.parent().children(),
        position = $siblings.index($this);

    $(".client-unit").removeClass("active-client").eq(position).addClass("active-client");
    $siblings.removeClass("active-client");
    $this.addClass("active-client");
  });

  $(".client-control-next, .client-control-prev").click(function() {

    var $this = $(this),
        currActiveClient = $(".clients-belt").find(".active-client"),
        position = $(".clients-belt").children().index(currActiveClient),
        clientNum = $(".client-unit").length;


    if($this.hasClass("client-control-next")) {
      if(position < clientNum - 1) {
        $(".active-client").removeClass("active-client").next().addClass("active-client");
      } else {
        $(".client-unit, .client-logo").removeClass("active-client");
        $(".client-unit:first-child, .client-logo:first-child").addClass("active-client");
      }
    } else if($this.hasClass("client-control-prev")) {
      if(position === 0) {
        $(".client-unit, .client-logo").removeClass("active-client");
        $(".client-unit:last-child, .client-logo:last-child").addClass("active-client");
      } else {
        $(".active-client").removeClass("active-client").prev().addClass("active-client");
      }
    }

  });
}







