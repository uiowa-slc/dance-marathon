<!doctype html>
<html class="no-js">
<head>
	<% base_tag %>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Donate Now! - Dance Marathon at the Iowa Memorial Union</title>
	<link rel="stylesheet" href="$ThemeDir/css/stream-embed-page.css" />
	<script src="$ThemeDir/bower_components/modernizr/modernizr.js"></script>
	<script src="$ThemeDir/bower_components/jquery/jquery.js"></script>
	<meta http-equiv="refresh" content="300">

</head>
<body class="$ClassName">


<nav class="top-bar" data-topbar>
  <ul class="title-area">
    <li class="name">
      <h1><a href="{$BaseHref}" target="_blank"><img src="{$ThemeDir}/images/wordmark.png" /></a></h1>
    </li>
    <li class="toggle-topbar menu-icon"><a href="#">Menu</a></li>
  </ul>

  <section class="top-bar-section">
    <!-- Right Nav Section -->
    <ul class="right">
      <li class="active"><a href="https://osl.iowa.uiowa.edu/dancemarathon/donate" target="_blank">Donate Now</a></li>
    </ul>
    <!-- Left Nav Section -->
    <ul class="left">
      <li><a href="{$BaseHref}" class="live" target="_blank">Live at the IMU</a></li>
      <% if IsPopup %>
     	 <li><a href="http://dancemarathon.uiowa.edu/stream/" target="_blank">Open the stream in a new window</a></li>
      <% end_if %>
    </ul>
  </section>
</nav>	

<section class="row">
	<div class="large-10 columns stream">
		<div id="stream-container">
		<p>We're sorry, we are unable to stream to this device. <a href="https://osl.iowa.uiowa.edu/dancemarathon/donate">Donate now!</a></p></div>
		<script src="http://collections.uiowa.edu/about/assets/swfobject/swfobject.js"></script>
		<script src="http://collections.uiowa.edu/about/assets/jwplayer/jwplayer.js"></script>
         <script type="text/javascript">
             var flashvars = {
                image: "http://flashmedia.uiowa.edu/logo.gif", 
                autostart: true,
                levels: [ 
                    { bitrate: 1000, file: "livestream2", width: 640 },
                    { bitrate: 500, file: "livestream1", width: 320 },
                       ],    
                  provider: "rtmp",
                  streamer: 'rtmp://flashmedia.uiowa.edu/live_scvs/',
                       'modes': [
                          {type: 'flash', src: 'http://collections.uiowa.edu/about/assets/jwplayer/player.swf'}
                        ]
                }
    
            jwplayer("stream-container").setup(flashvars);
          </script>
	</div>
	<div class="large-2 columns twitter">
		<a class="twitter-timeline" href="https://twitter.com/UIDM" data-widget-id="431826010875494400" data-chrome="noborders noheader nofooter transparent noscrollbar">Tweets by @UIDM</a>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
	</div>
</section>

	<script src="$ThemeDir/bower_components/foundation/js/foundation.min.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-47774126-1', 'uiowa.edu');
  ga('send', 'pageview');

	</script>
	<script src="$ThemeDir/javascript/app.js"></script>
</body>
</html>
