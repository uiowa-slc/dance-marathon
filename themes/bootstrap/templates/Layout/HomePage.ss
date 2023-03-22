<% if $BgVideo %>
    <section>
        <figure class="bgvideo-wrapper" >
            <img src="{$ThemeDir}/dist/images/homepage-lrg.jpg" alt="Video Preview">
            <video autoplay loop muted playsInline src="$BgVideo.URL" id="bgvid"></video>
        </figure>
    </section>
<% end_if %>

<% include Header %>

<main class="main" role="main">
	<section id="main-content" class="container" tabindex="-1">
		<div class="slogan">
			<span class="dancers"></span>
			<h1>We're creating tomorrow by dancing today</h1>
		</div>
		<div class="actions clearfix">
			<div class="action pink">
                <h3 class="action-title">
                    <a href="https://dance.dancemarathon.uiowa.edu/" target="_blank" class="action-link">Register</a>
                </h3>
			</div>
			<div class="action green">
                <h3 class="action-title">
                    <a href="https://dance.dancemarathon.uiowa.edu/Profile" target="_blank" class="action-link">Login</a>
                </h3>
			</div>
			<div class="action blue">
                <h3 class="action-title">
                    <a href="https://donate.dancemarathon.uiowa.edu" target="_blank" class="action-link">Donate</a>
                </h3>
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
		  	$StreamCode.RAW
		  <% else %>
		  	<script src="https://cdn.jwplayer.com/players/z2z9XSYM-7EaCFiXK.js"></script>
		  <% end_if %>
			<div class="share-sheet">
				<p class="share-sheet__text mt-2">Share:
					<a class="btn btn-primary" href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u={$absoluteBaseURL}stream', '_blank', 'width=400,height=500');void(0);" title="Facebook">Facebook</a>
					<a class="btn btn-primary" href="https://twitter.com/intent/tweet?text={$absoluteBaseURL}stream" target="_blank" class="share-sheet__button share-sheet__button--twitter icon-twitter" title="Twitter">Twitter</a>
				</p>
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
                
				<ul class="clearfix list-unstyled social">
					<% if $SiteConfig.FacebookLink %>
						<li>
                            <a href="$SiteConfig.FacebookLink" title="Facebook" target="_blank">
                            <i class="fab fa-facebook-square pr-2 align-middle"></i> Facebook</a>
						</li>
					<% end_if %>
					<% if $SiteConfig.TwitterLink %>
						<li>
                            <a href="$SiteConfig.TwitterLink" title="Twitter" target="_blank">
                            <i class="fab fa-twitter-square pr-2 align-middle"></i> Twitter</a>
						</li>
					<% end_if %>
					<% if $SiteConfig.YouTubeLink %>
						<li>
                            <a href="$SiteConfig.YoutubeLink" title="Youtube" target="_blank">
                            <i class="fab fa-youtube pr-2 align-middle"></i> YouTube</a>
						</li>
					<% end_if %>
					<% if $SiteConfig.InstagramLink %>
						<li>
                            <a href="$SiteConfig.InstagramLink" title="Instagram" target="_blank">
                            <i class="fab fa-instagram pr-2 align-middle"></i> Instagram</a>
						</li>
					<% end_if %>
				</ul>
				<% if $Sidebar %>
					<div class="sidebar-content">
						$Sidebar
					</div>
				<% end_if %>
			</div>
			<% if $ContentFull %>
				<div class="home-contentfull">
					$ContentFull
				</div>
			<% end_if %>
		</div>


	</section>
</main>

<!-- Family Members -->
<section class="familymember-wrapper">
	<div class="container">
		<div class="familymember">
			<% if $Familys %>
			<div class="familymember__slider">
				<% loop $Familys %>
					<div class="carousel-cell familymember__slide">
						<h3 class="familymember__title">$AssociatedPage.Title</h3>
						<img src="$AssociatedPage.FamilyPhoto.FocusFill(220,220).URL" alt="$Title" class="familymember__img">
						<% if $AssociatedPage %><a href="$AssociatedPage.Link" class="familymember__btn">View Their Story</a><% end_if %>
					</div>
				<% end_loop %>
			</div>
			<% end_if %>
		</div>
	</div>
</section>

<!-- Youtube -->
<section class="video-wrapper">
	<img src="{$ThemeDir}/dist/images/video-gradient-top.jpg" alt="" class="gradient-top">
	<div class="container">
		<div class="row">
			<% loop $Videos %>
				<div class="col-md-4">
					<div class="video">
						<a href="//www.youtube.com/embed/$YoutubeVideoID?rel=0&autoplay=1" data-fancybox="home-video" class="video-img">
							<img src="https://img.youtube.com/vi/$YoutubeVideoID/0.jpg" alt="$Title">
							<span class="play-btn"></span>
						</a>
						<p class="video-desc"><strong>$Title</strong></p>
					</div>
				</div>
			<% end_loop %>
        </div>
        <% if $SiteConfig.YouTubeLink %>
            <a href="$SiteConfig.YouTubeLink" target="_blank" class="watchall">
                <i class="fab fa-youtube pr-2 align-middle"></i>Watch all of our videos
            </a>
        <% end_if %>
	</div>
	<%-- <img src="{$ThemeDir}/dist/images/video-gradient-bottom.jpg" alt="" class="gradient-bottom"> --%>
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
				<a href="https://dance.dancemarathon.uiowa.edu/" class="btn">Create an account <span class="icon-arrow-right"></span></a>
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
