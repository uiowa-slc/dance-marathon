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