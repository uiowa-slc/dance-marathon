<main class="container main" role="main">
	<div class="row">

		<h2>Uploads from our uidancemarathon channel!</h2>
		<hr>
		<% loop getYouTubeVideos %>
			<h3>$Title<h3>
			<a href="http://www.youtube.com/watch?v=$UrlSegment" target="_blank">
				<img src="$ThumbnailUrl" >
			</a>				
			<hr>
		<% end_loop %>

	</div><!-- end .row -->
</main><!-- end .container -->