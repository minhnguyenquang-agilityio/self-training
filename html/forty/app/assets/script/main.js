( function( $ ) {

  $(function() {
    var $body = $('body');
    var $window = $(window);

    $window.on('load pageshow', function() {
      window.setTimeout(function() {
        $body.addClass('loaded');
      }, 100);
    });

    if (navigator.appVersion.indexOf("Trident") !== -1) {
      $body.addClass('is-ie');
    }

  });
} )( jQuery );
