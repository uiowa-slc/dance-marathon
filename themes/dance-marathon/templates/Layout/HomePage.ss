<main class="main" role="main">
	<section id="main-content" class="container" tabindex="-1">
		<div class="slogan">
			<span class="dancers"></span>
			<h1>We're creating tomorrow by dancing today</h1>
		</div>
		<div class="actions clearfix">
			<div class="action pink">
				<h3 class="action-title"><a href="#" class="action-link">Register <span class="icon-plus"></span></a></h3>
				<div class="action-content">
					<p>Register to be a part to he University's largest student run philanthropy. <a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate">Create an account</a></p>
				</div>
			</div>
			<div class="action green">
				<h3 class="action-title"><a href="#" class="action-link">Login <span class="icon-plus"></span></a></h3>
				<div class="action-content">
					<p>Login to edit, share, and check who has given to your online giving page. <a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login">Login here</a></p>
				</div>
			</div>
			<div class="action blue">
				<h3 class="action-title"><a href="#" class="action-link">Donate <span class="icon-plus"></span></a></h3>
				<div class="action-content">
					<p>Donate to join the fight against pediatric cancer. <a href="https://osl.iowa.uiowa.edu/dancemarathon/donate">Make a donation</a></p>
				</div>
			</div>
		</div>
		<% if $EnableStream %>
		<div class="content-wrapper content-wrapper--stream clearfix">
		  <% if $StreamHeader %>
		  <h1 class="stream-header stream-header--no-margin"><a href="stream/">$StreamHeader</a></h1>
		  <% else %>
		  <h1 class="stream-header stream-header--no-margin"><a href="stream/">Livestream from the IMU:</a></h1>
		  <% end_if %>
		  <% if $StreamCode %>
		  	$StreamCode
		  <% else %>
		  	<script src="//content.jwplatform.com/players/tO9PdlBo-7EaCFiXK.js"></script>	
		  <% end_if %>
			<div class="share-sheet">
				<p class="share-sheet__text">Share:
					<a class="share-sheet__button share-sheet__button--fb icon-facebook" href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u={$absoluteBaseURL}stream', '_blank', 'width=400,height=500');void(0);" title="Facebook"></a>
					<a  href="https://twitter.com/intent/tweet?text={$absoluteBaseURL}stream" target="_blank" class="share-sheet__button share-sheet__button--twitter icon-twitter" title="Twitter"></a>
				</p>
				<p class="text-center"><a href="{$absoluteBaseURL}stream">Permanent link</a></p>
			</div>
		</div>
		<% end_if %>
		<div class="content-wrapper clearfix">
			<div class="content-left">	
				<p class="university">University of Iowa Dance Marathon</p>	
				$Content
				$Form
			</div>
			<div class="content-right">
				<div class="quicklinks">
					<h3>Quicklinks</h3>
					$Quicklinks
				</div>
				<ul class="clearfix social">
					<% if $SiteConfig.FacebookLink %>
						<li>
							<a href="$SiteConfig.FacebookLink" title="Facebook" target="_blank"><span class="icon-facebook"></span> Facebook</a>
						</li>
					<% end_if %>
					<% if $SiteConfig.TwitterLink %>
						<li>
							<a href="$SiteConfig.TwitterLink" title="Twitter" target="_blank"><span class="icon-twitter"></span> Twitter</a>
						</li>
					<% end_if %>
					<% if $SiteConfig.YoutubeLink %>
						<li>
							<a href="$SiteConfig.YoutubeLink" title="Youtube" target="_blank"><span class="icon-youtube"></span> YouTube</a>
						</li>
					<% end_if %>
				</ul>
			</div>

		</div>


	</section>
</main>
<section class="video-wrapper">
	<img src="{$ThemeDir}/images/video-gradient-top.jpg" alt="" class="gradient-top">
	<div class="container">
		<div class="row">
			<% loop $Videos %>
				<div class="col-md-4">
					<div class="video">
						<a href="//www.youtube.com/embed/$YoutubeVideoID?rel=0&autoplay=1" class="video-img lightbox" data-lightbox-gallery="video_gallery" title="$Title">
							<img src="https://img.youtube.com/vi/$YoutubeVideoID/0.jpg" alt="$Title">
							<span class="play-btn"></span>
						</a>
						<p class="video-desc"><strong>$Title</strong></p>
					</div>
				</div>
			<% end_loop %>
		</div>
		<a href="$SiteConfig.YoutubeLink" target="_blank" class="watchall"><span class="icon-youtube"></span>Watch all of our videos</a>
	</div>
	<img src="{$ThemeDir}/images/video-gradient-bottom.jpg" alt="" class="gradient-bottom">
</section>
<section class="testimonial-wrapper">
	<div class="container">
		<div class="testimonials flexslider">
			<ul class="slides">
				<% loop $Testimonials %>
					<li>
						<p class="quote">$Quote</p>
						<span class="cite">&ndash; <% if $Website %><a href="$Website">$Citation</a><% else %>$Citation<% end_if %></span>
					</li>
				<% end_loop %>
			</ul>
		</div>
	</div>
</section>

<section class="howitworks">
	<span class="dancers"></span>
	<span class="flame"></span>
	<div class="container">
		<h2>How It Works</h2>
		<div class="clearfix steps">
			<div class="step step1">
				<h3>1. Register</h3>
				<p>How do I get involved? What can I do? You can start by getting signed up today! Most people get involved their first year by signing up to be a dancer. Once you get signed up you will be assigned a Morale Captain who will help keep you informed with the organization.</p>
				<a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate" class="btn">Create an account <span class="icon-arrow-right"></span></a>
			</div>
			<div class="step step2">
				<h3>2. Raise Funds</h3>
				<p>To attend the Big Event dancers must raise $500. How can I raise that much money?! Raising your $500 is actually really easy, and there are several ways to do it! For more information, we came up with some tips on how to reach your fundraising goal.</p>
				<a href="{$BaseHref}dancers/fundraising-resources/" class="btn">How to fundraise <span class="icon-arrow-right"></span></a>
			</div>
			<div class="step step3">
				<h3>3. Dance</h3>
				<p>Dance Marathon is a really incredible experience that is hard to put into words until you actually experience it for yourself! During the 24 hours you will experience the highest of highs and the lowest of lows, but it is one of the most rewarding experiences.</p>
				<a href="{$BaseHref}dancers/being-a-dancer-and-faq/" class="btn">Dancer FAQ <span class="icon-arrow-right"></span></a>
			</div>
		</div>
	</div>
</section>