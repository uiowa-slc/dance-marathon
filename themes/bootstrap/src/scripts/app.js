
$(window).on("load", function(){

    $('.carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        autoPlay: false,
        wrapAround: true
    });

    // Homepage Carousel
	$('.hero-carousel').flickity({
		// options
		prevNextButtons: false,
		autoPlay: true,
		wrapAround: true,
		imagesLoaded: true,

		bgLazyLoad: true,
		fade: true
    });
    
    // Homepage Family Member Carousel
    $('.familymember__slider').flickity({
		cellAlign: 'left',
		contain: true,
		adaptiveHeight: true,
		prevNextButtons: false,
		imagesLoaded: true,
		groupCells: '100%'
    });
    
    // $('.action-link').click(function() {
	// 	$(this).toggleClass('open');
	// 	$(this).parent().next('.action-content').slideToggle();
	// 	return false;
	// });

});
