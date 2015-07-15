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
					<p>Register to be a part of the University's largest student-run philanthropy and help change a child's life. <a href="#">Create an account</a>.</p>
				</div>
			</div>
			<div class="action green">
				<h3 class="action-title"><a href="#" class="action-link">Login <span class="icon-plus"></span></a></h3>
				<div class="action-content">
					<p>Register to be a part of the University's largest student-run philanthropy and help change a child's life. <a href="#">Create an account</a>.</p>
				</div>
			</div>
			<div class="action blue">
				<h3 class="action-title"><a href="#" class="action-link">Donate <span class="icon-plus"></span></a></h3>
				<div class="action-content">
					<p>Register to be a part of the University's largest student-run philanthropy and help change a child's life. <a href="#">Create an account</a>.</p>
				</div>
			</div>
		</div>
		<div class="content-wrapper clearfix">
			<div class="content-left">
				$Content
				$Form
			</div>
			<div class="content-right">
				<div class="quicklinks">
					<h3>Quicklinks</h3>
					<ul>
						<li><a href="#">Find a dancer to donate to</a></li>
						<li><a href="#">Make a donation</a></li>
						<li><a href="#">Dancer resources</a></li>
						<li><a href="#">Fundraising resources</a></li>
						<li><a href="#">Dancer FAQ</a></li>
						<li><a href="#">Share your story</a></li>
						<li><a href="#">Ways to sponsor DM</a></li>
						<li><a href="#">Contact Us</a></li>
					</ul>
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
			<div class="col-md-4">
				<div class="video">
					<a href="//www.youtube.com/embed/Rj_1biSOaEc?rel=0&autoplay=1" class="video-img lightbox" data-lightbox-gallery="video_gallery" title="UIDM 19 | Mile Motivators">
						<img src="{$ThemeDir}/images/video1.jpg" alt="">
						<span class="play-btn"></span>
					</a>
					<p class="video-desc"><strong>UIDM 19 | Mile Morivators</strong><br />
					Over 100 runners from the University of Iowa Dance Marathon will run the Bank of American Chicago Marathon in honor of...</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="video">
					<a href="//www.youtube.com/embed/65Q5yeu1PRk?rel=0&autoplay=1" class="video-img lightbox" data-lightbox-gallery="video_gallery" title="UIDM 19 | Why do You Dance?">
						<img src="{$ThemeDir}/images/video2.jpg" alt="">
						<span class="play-btn"></span>
					</a>
					<p class="video-desc"><strong>UIDM 19 | Why do You Dance?</strong><br />
					Over 100 runners from the University of Iowa Dance Marathon will run the Bank of American Chicago Marathon in honor of...</p>
				</div>
			</div>
			<div class="col-md-4">
				<div class="video">
					<a href="//www.youtube.com/embed/y_kEZswKP_w?rel=0&autoplay=1" class="video-img lightbox" data-lightbox-gallery="video_gallery" title="UI Dance Marathon 21 | Dancer Video">
						<img src="{$ThemeDir}/images/video3.jpg" alt="" >
						<span class="play-btn"></span>
					</a>
					<p class="video-desc"><strong>UI Dance Marathon 21 | Dancer Video</strong><br />
					Over 100 runners from the University of Iowa Dance Marathon will run the Bank of American Chicago Marathon in honor of...</p>
				</div>
			</div>
		</div>
		<a href="$SiteConfig.YoutubeLink" target="_blank" class="watchall"><span class="icon-youtube"></span>Watch all of our videos</a>
	</div>
	<img src="{$ThemeDir}/images/video-gradient-bottom.jpg" alt="" class="gradient-bottom">
</section>
<section class="testimonial-wrapper">
	<div class="container">
		<div class="testimonials flexslider">
			<ul class="slides">
				<li>
					<p class="quote">This will be my first University of Iowa Dance Marathon and I absolutely cannot put into words how much I am looking forward to seeing everyone's hard work throughout the year pay off!</p>
					<span class="cite">&ndash; Dance Marathon Coordinator, <a href="#">Tracey Martin</a></span>
				</li>
				<li>
					<p class="quote">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec id elit non mi porta gravida at eget metus.</p>
					<span class="cite">&ndash; Dance Marathon Coordinator, <a href="#">Rickey Martin</a></span>
				</li>
				<li>
					<p class="quote">Maecenas sed diam eget risus varius blandit sit amet non magna. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
					<span class="cite">&ndash; Dance Marathon Coordinator, <a href="#">Gale Elliot</a></span>
				</li>
			</ul>
		</div>
	</div>
</section>

<section class="howitworks">
	<span class="dancers"></span>
	<span class="balloon"></span>
	<div class="container">
		<h2>How It Works</h2>
		<div class="clearfix steps">
			<div class="step step1">
				<h3>1. Register</h3>
				<p>How do I get involved? What can I do? You can start by getting signed up today! Most people get involved their first year by signing up to be a dancer. Once you get signed up you will be assigned a Morale Captain who will help keep you informed with the organization.</p>
				<a href="#" class="btn">Create an account</a>
			</div>
			<div class="step step2">
				<h3>2. Raise Funds</h3>
				<p>To attend the Big Event dancers must raise $500. How can I raise that much money?! Raising your $500 is actually really easy, and there are several ways to do it! For more information, we came up with some tips on how to reach your fundraising goal.</p>
				<a href="#" class="btn">How to fundraise</a>
			</div>
			<div class="step step3">
				<h3>3. Dance</h3>
				<p>Dance Marathon is a really incredible experience that is hard to put into words until you actually experience it for yourself! During the 24 hours you will experience the highest of highs and the lowest of lows, but it is one of the most rewarding experiences.</p>
				<a href="#" class="btn">Dancer stories</a>
			</div>
		</div>
	</div>
</section>