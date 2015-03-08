

function fadedEls(el, shift) {
  el.css('opacity', 0);

  switch (shift) {
  case undefined:
    shift = 0
    break;
  case 'h':
    shift = el.eq(0).outerHeight();
    break;
  case 'h/2':
    shift = el.eq(0).outerHeight() / 2;
    break;
  }

  $(window).resize(function() {
    if (!el.hasClass('ani-processed')) {
      el.eq(0).data('scrollPos', el.eq(0).offset().top - $(window).height() + shift);
    }
  }).scroll(function() {
    if (!el.hasClass('ani-processed')) {
      if ($(window).scrollTop() >= el.eq(0).data('scrollPos')) {
        el.addClass('ani-processed');
        el.each(function(idx) {
          $(this).delay(idx * 200).animate({opacity:1}, 600);
        });
      }
    }
  });
}

(function($) {
    $(function() {

      if (/msie/i.test(navigator.userAgent)) {
        $('img').each(function() {
          $(this).css({
            width: $(this).attr('width') + 'px',
            height: 'auto'
          });
        });
      }

      fadedEls($('.features img'), 'h');

      // ordered-items
      (function(el) {
        $(window).scroll(function() {
          if ($(window).width() > 480) {
            $('.row', el).each(function(idx) {
              if ($(window).scrollTop() >= ($(this).offset().top - $(window).height() + $(window).height()/2 +100)) {
                // scroll current block to top
                if (!$(this).hasClass('active')) {
                  $.scrollTo($(this), {axis:'y', duration:500});
                }
                $(this).addClass('active');
              } else {
                $(this).removeClass('active');
              }
            });
          }
        });

        $(window).resize(function() {
          $('.page-transitions', el).each(function() {
            var maxH = 0;
            $('.pt-page', this).css('height', 'auto').each(function() {
              var h = $(this).outerHeight();
              if (h > maxH) maxH = h;
            }).css('height', maxH+'px');
            $(this).css('height', maxH+'px');
          });
        });

        $('.page-transitions', el).each(function() {
          var pt = PageTransitions();
          pt.init(this);

          $('.pt-control-prev', this).on('click', function() {
            pt.gotoPage(68, 'prev');
            return false;
          });

          $('.pt-control-next', this).on('click', function() {
            pt.gotoPage(68, 'next');
            return false;
          });
        });
      })($('.ordered-items'));

      // responsive
      $(window).resize(function() {
        // ordered-items
        if ($(window).width() > 480) {
          $('.ordered-items.mobile-processed').removeClass('mobile-processed').children().each(function() {
            $('.box', this).each(function() {
              $(this).appendTo($(this).parent());
            });
          });
        } else {
          $('.ordered-items:not(.mobile-processed)').addClass('mobile-processed').children().each(function() {
            $('.box', this).each(function() {
              $(this).insertAfter($(this).parent().find('h3'));
            });
          });
        }
      });

      $(window).resize().scroll();
    });


    $(window).load(function() {
      $('html').addClass('loaded');
      $(window).resize().scroll();
    });
})(jQuery);

function sendMail() {
    var link = "mailto:info@elbowgrease.me"
             + "?subject=Inquiry from " + escape(document.getElementById('name').value)  
             + "&body=" + escape(document.getElementById('message').value)
    ;
    window.location.href = link;
}

function sendMailEA() {
    var link = "mailto:info@elbowgrease.me"
             + "?subject=I want some info!"
             + "&body=Can you plese tell me more?"
    ;
    window.location.href = link;
}

$("#beta-notify").click(function(){
  $.ajax({
    type: 'POST',
    contentType: 'application/json',
    url: '/static/v1/beta/users',
    data : JSON.stringify({ 'email': escape(document.getElementById('email').value) }),
    async: true,
    success: function (response) {
      if (response.status === 'error') {
        $("#signup-alerts").text('Please check your e-mail and try again!');
      } else {
        $("#signup-div").html('<div class="signup-thanks">Thank you!</div>');
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      $("#signup-alerts").text('Try again!');
    }
  });
  return false;
});

$(document).ready(function() {
$('#indexCarousel').carousel('cycle');
});
