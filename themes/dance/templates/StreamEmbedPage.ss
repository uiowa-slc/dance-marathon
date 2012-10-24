<!DOCTYPE html>

<html lang="en">
	<head>
    	
		<% base_tag %>
		<title><% if MetaTitle %>$MetaTitle<% else %>$Title<% end_if %> &raquo; $SiteConfig.Title</title>
		$MetaTags(false)
		<link rel="shortcut icon" href="/favicon.ico" />
		
		<% require themedCSS(stream-embed-page) %> 
	</head>
	<body>
    <div id="content">
        <h1 class="logo">Dance Marathon</h1>
        <h2>Happening Now</h2>
  	  <!-- Last Year's Embed Code
  	  
  	  <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="500" height="300" id="utv250142"><param name="flashvars" value=	"autoplay=false&amp;brand=embed&amp;cid=6899642&amp;v3=1"/><param name="allowfullscreen" value="true"/><param name="allowscriptaccess" value="always"/><param name="movie" value="http://www.ustream.tv/flash/viewer.swf"/><embed flashvars="autoplay=false&amp;brand=embed&amp;cid=6899642&amp;v3=1" width="480" height="296" allowfullscreen="true" allowscriptaccess="always" id="utv250142" name="utv_n_656979" src="http://www.ustream.tv/flash/viewer.swf" type="application/x-shockwave-flash" />	</object> -->
  	  
			<iframe width="900" height="520" src="http://www.ustream.tv/embed/10322181?autoplay=true" scrolling="no" frameborder="0" style="border: 0px none transparent;">    </iframe>
  	  
    		<p>Live from the IMU, The University of Iowa</p>
    	<div class="nav">
    		<ul class="link">
                <li class="donation"><a href="https://osl.iowa.uiowa.edu/dancemarathon/sponsor/3" target="_blank">Donate</a></li>
                <li class="visit"><a href="http://www.ustream.tv/channel/iowa-dance-marathon">Visit Ustream Page</a></li>
                <li class="skip"><a id="fancybox-close" href="#" onClick="parent.jQuery.fancybox.close();">Skip to site</a>
                </li>
    		</ul>
    		
		<div id="donate-widget">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="300" height="250"
			codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">
				<param name="movie" value="http://facebook.mgive.com/mg.swf?statfile=http%3A%2F%2Ffacebook.mgive.com%2Fdata%2Fcf1222.xml" />
				<param name="quality" value="high" />
				<param name="bgcolor" value="#ffffff" />
				<param name="wmode" value="transparent" />
				<embed src="http://facebook.mgive.com/mg.swf?statfile=http%3A%2F%2Ffacebook.mgive.com%2Fdata%2Fcf1222.xml" quality="high" bgcolor="#ffffff"
				width="300" height="250" name="mGive" align="middle"
				play="true"
				loop="false"
				allowScriptAccess="always"
				type="application/x-shockwave-flash"
				wmode="transparent"
				pluginspage="http://www.macromedia.com/go/getflashplayer">
				</embed>
			</object>
		</div>
		 
		<div style="clear: both;"></div>
    		
        </div>
         </div>
	</body>
	
</html>
