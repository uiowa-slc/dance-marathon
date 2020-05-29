<!DOCTYPE html>
<!--[if lt IE 10]><html lang="en" class="lt-ie10 no-js"> <![endif]-->
<!--[if lt IE 9]><html lang="en" class="lt-ie9 no-js"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
<head>
	<% base_tag %>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="$Content.LimitCharacters(150)">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="google-site-verification" content="aBS-4rdqUqZF9JSdfnw2kZmw1ZOD8E8s0PjCSjn2UEE" />
	$OpenGraph.RAW
	<% include TwitterCard %>
	<title>$SiteConfig.Title</title>
	<script src="{$ThemeDir}/src/scripts/modernizr.js"></script>
	<!-- Typekit -->
	<% include TypeKit %>
	<!-- Favicon -->
	<link rel="shortcut icon" href="{$BaseHref}favicon.ico" type="image/x-icon">
	<!-- CSS -->
	<link rel="stylesheet" href="{$ThemeDir}/dist/styles/main.css" />
	<!--[if IE 8]>
		<meta http-equiv="x-ua-compatible" content="IE=8">
	  	<script>var IE8 = true;</script>
	  	<script src="{$ThemeDir}/src/scripts/ie/site.ie8.js"></script>
		<link rel="stylesheet" href="{$ThemeDir}/css/site.ie8.css">
	<![endif]-->
	<!--[if lt IE 9]>
		<script>
			document.createElement('video');
		</script>
	<![endif]-->
	<!--[if IE 9]>
		<script>var IE9 = true;</script>
		<script src="{$ThemeDir}/src/scripts/ie/site.ie9.js"></script>
	<![endif]-->
	<!--[if lt IE 9]>
		 <script src="{$ThemeDir}/src/scripts/ie/html5shiv.js"></script>
		 <script src="{$ThemeDir}/src/scripts/ie/respond.min.js"></script>
	<![endif]-->
</head>
<body class="$ClassName shifter">

	<div class="shifter-page">
		<a id="skiptocontent" class="visuallyhidden focusable" href="#main-content">Skip to main content</a>
		<% include UiowaBar %>
		<video autoplay loop muted poster="{$ThemeDir}/dist/images/homepage-lrg.jpg" id="bgvid">
			<source src="{$ThemeDir}/dist/images/dm_video.webm" type="video/webm">
			<source src="{$ThemeDir}/dist/images/dm_video-hevc.mp4" type='video/mp4; codecs="hvc1"'>
			<source src="{$ThemeDir}/dist/images/dm_video.mp4" type='video/mp4; codecs="avc1"'>
		</video>
		<% include Header %>
		$Layout
		<% include Footer %>
	</div>

	<!-- Mobile Navigation Slideout -->
	<% include ShifterNavigation %>

	<!-- JS -->

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="{$ThemeDir}/dist/scripts/main.min.js"></script>
	$Analytics
</body>
</html>
