$(document).ready(function() {

	// add js class to body if javascript enabled
	$('html').removeClass('no-js');

	// $('.main-nav').setup_navigation();

	// Shifter
	$.shifter({
		maxWidth: "768px"
	});

	// Naver
	// $(".naver").naver();
	$(".sec-nav").navigation({
		maxWidth: "979px"
	});

	$('.testimonials').flexslider({
		animation: "fade",
		directionNav: false
	});

	$('.lightbox').lightbox();

	$('.action-link').click(function() {
		$(this).toggleClass('open');
		$(this).parent().next('.action-content').slideToggle();
		// $('.action-content').slideToggle();
		return false;
	});

});
