<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', '$SiteConfig.Analytics', 'auto');
  ga('require', 'linkid', 'linkid.js');
  ga('send', 'pageview');

</script>
<% if $URLSegment == "home" %>
	<% if $EnableStream %>
  	<script>
        jwplayer().on('play', function(e) {
			ga('send', 'event', 'Videos', 'play', 'DM23 2017 HomePage Stream');
        });
  	</script>
  	<% end_if %>
<% else_if $ClassName == "StreamingPage" %>
  	<script>
        jwplayer().on('play', function(e) {
			ga('send', 'event', 'Videos', 'play', 'DM23 2017 StreamPage Stream');
        });
  	</script>
<% end_if %>