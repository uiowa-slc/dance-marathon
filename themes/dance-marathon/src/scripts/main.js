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

	// Testimonials with flexslider
	$('.testimonials').flexslider({
		animation: "fade",
		directionNav: false
	});

	// $('.familymember').flexslider({
	// 	animation: "fade",
	// 	directionNav: false
	// });

	$('.familymember__slider').flickity({
		cellAlign: 'left',
		contain: true,
		adaptiveHeight: true,
		prevNextButtons: false,
		imagesLoaded: true,
		groupCells: '100%'
	});


	// Photo Gallery using flexslider
	$('.flexslider').flexslider({
		smoothHeight: true,
		slideshow: false
	});


	$('.action-link').click(function() {
		$(this).toggleClass('open');
		$(this).parent().next('.action-content').slideToggle();
		// $('.action-content').slideToggle();
		return false;
	});

	// Timeline
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;

	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame)
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
	// end Timeline

});
