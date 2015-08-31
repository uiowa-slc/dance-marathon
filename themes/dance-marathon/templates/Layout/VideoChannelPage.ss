<% include HeaderPhoto %>
<main class="container main" role="main">
	<h1>$Title</h1>
	$Content
	$Form
	<div class="row">
		<% loop getYouTubeVideos %>
			<div class="col-md-4">
				<div class="video">
					<a href="http://www.youtube.com/embed/$UrlSegment?rel=0&amp;autoplay=1" class="video-img lightbox" data-lightbox-gallery="video_gallery" title="$Title">
						<img src="$ThumbnailUrl" alt="$Title">
						<span class="play-btn"></span>
					</a>
					<p class="video-desc"><strong>$Title</strong></p><br />
				</div>
			</div>
		<% end_loop %>
	</div>
</main>
