<% if $URLSegment == "home" %>
	<% if $EnableStream %>
  	<script>
        jwplayer().on('play', function(e) {
			ga('send', 'event', 'Videos', 'play', 'DM HomePage Stream');
        });
  	</script>
  	<% end_if %>
<% else_if $ClassName == "StreamingPage" %>
  	<script>
        jwplayer().on('play', function(e) {
			ga('send', 'event', 'Videos', 'play', 'DM StreamPage Stream');
        });
  	</script>
<% end_if %>
