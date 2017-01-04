( function( $ ) {

  $(function() {
    var $window = $(window);
    var $body = $('body');
    var $banner = $('#banner');
    var $header = $('#header');

    $window.on('load pageshow', function() {
      window.setTimeout(function() {
        $body.addClass('loaded');
      }, 100);
    });

    $window.on('resize', function() {
      $window.trigger('scroll');
    });

    $window.on('load', function() {
      $banner.scrollex({
        bottom: $header.height() + 10,
        initialize: function() {
          $header.addClass('alt');
        },
        terminate: function() {
          $header.removeClass('alt');
        },
        enter: function() {
          $header.addClass('alt');
          $header.removeClass('reveal');
        },
        leave: function() {
          $header.removeClass('alt');
          $header.addClass('reveal');
        }
      });
    });

    if (navigator.appVersion.indexOf("Trident") !== -1) {
      $body.addClass('is-ie');
    }

  });
} )( jQuery );
