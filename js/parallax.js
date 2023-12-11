$(document).ready(function() {
    $('a[href*="#"]').each(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && location.hostname == this.hostname 
          && this.hash.replace(/#/, '')) {
            var $targetId = $(this.hash),
                $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            if ($target) {
                var targetOffset = $target.offset().top-88;
                $(this).click(function() {
                    $("#nav li a").removeClass("active");
                    $(this).addClass('active');
                    $('html, body').animate({ scrollTop: targetOffset }, 1000);
                    return false;
                });
            }
        }
    });

});

$('.img-parallax').each(function() {
    var img = $(this);
    var imgParent = $(this).parent();

    function parallaxImg() {
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
            var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
        }
        img.css({
            top: imgPercent + '%',
            transform: 'translate(-50%, -' + imgPercent + '%)'
        });
    }
    $(document).on({
        scroll: function() {
            parallaxImg();
        },
        ready: function() {
            parallaxImg();
        }
    });
});