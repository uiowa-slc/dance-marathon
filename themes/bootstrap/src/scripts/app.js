
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

});
