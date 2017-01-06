(function($) {

  $(document).ready(function() {
    var $window = $(window);
    var $body = $('body');
    var $banner = $('#banner');
    var $header = $('#header');
    var $menuButton = $('#menu-btn');
    var $menu = $('#menu');

    $window.on('resize', function() {
      $window.trigger('scroll');
    });

    window.setTimeout(function() {
      $body.addClass('loaded');
    }, 100);

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

    $banner.scrolly({bgParallax: true});

    $menuButton.on('click', function() {
      $body.addClass('is-menu-visible');
    });

    $menu.on('click', function() {
      $body.removeClass('is-menu-visible');
    });

    if (navigator.appVersion.indexOf("Trident") !== -1) {
      console.log('On ie');
      $body.addClass('is-ie');
    }
  });


})(jQuery);
