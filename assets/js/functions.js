---
---

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
};


var submitForm = function() {
  $.ajax({
    url: "//forms.brace.io/{{ site.data.settings.email }}", 
    method: "POST",
    data: {
      name: $("#input-name").val(),
      reply: $("#input-email").val(),
      message: $("#input-message").val()
    },
    dataType: "json",

    success: function() {
      // SUCCESS HANDLER
      console.log("success yo!");
      $("#contact-form").find("input, textarea").not("#input-submit").each(function() { 
        $(this).val("").removeClass("form__input--success");
      });
    },
    error: function() {
      console.log("error yo!");
    },
    complete: function() {
      console.log("complete yo!");
    }
  });
};

var validateForm = function() {
  // set required fields
  // iterates over all input and textarea, and add the objects with prop("required") to requiredFiels array.
  var requiredFields = $("#contact-form").find("input, textarea").not("#input-submit").map(function() {
    if($(this).prop("required")) { return this };
  });
  // resets any states
  requiredFields.each(function() { $(this).removeClass("form__input--error") });

  var allFieldsFilled = new Array();

  for (var i = 0; i < requiredFields.length; i++) {
    // validate required fields
    // requiredField[i] now stands for the raw dom element, thats why we use .value instead of .val()
    if(requiredFields[i].value == "") {
      // $(requiredFields[i]) transform the DOM elements into jquery objects
      $(requiredFields[i]).addClass("form__input--error");
      allFieldsFilled.push(false);
    } else {
      allFieldsFilled.push(true);
    }
  };

  // return true if email is not valid
  if(!$("#input-email").validEmail()) {
    $("#input-email").addClass("form__input--error");
  }
  
  // validate email
  // if all true than return true
  if($.inArray("false", allFieldsFilled) > -1 || $("#input-email").validEmail()) {
    requiredFields.each(function() { $(this).addClass("form__input--success") });
    return true;
  }
}

$("#contact-form").submit(function(event) {
  event.preventDefault();
  if(validateForm() == true) {
    submitForm();
  }
});


// $("#contact-form").submit(function(event) {
//   event.preventDefault();
//   if($("#input-email").validEmail()) {
//     // RUN POST
//     submitForm();
//   } else {
//     alert("check your email bro!")
//   }
// });






