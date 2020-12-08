<!-- new bootstrap-project template base: -->

<% include Header %>

<main class="container-xl my-5">
    <div class="row">
        <div class="<% if $Menu(2) %>col-lg-8 col-xl-9 <% else %>col-md-10 offset-md-1<% end_if %>">

            <article id="content">

                <h1>$Title</h1>
                $Content
                $Form
                $PageComments
            </article>


        </div>
        <% if $Menu(2) %>
            <% include SideBar %>
        <% end_if %>
    </div>
</main>


<!-- old template: -->
<% include HeaderPhoto %>
<main class="container main" role="main">
	<h1>$Title</h1>
	$Content
	$Form
	<div class="row">
		<% loop getYouTubeVideos %>
			<div class="col-md-4">
				<div class="video">
					<a href="http://www.youtube.com/embed/$UrlSegment?rel=0&amp;autoplay=1" data-fancybox="video" class="video-img" title="$Title">
						<img src="$ThumbnailUrl" alt="$Title">
						<span class="play-btn"></span>
					</a>
					<p class="video-desc"><strong>$Title</strong></p><br />
				</div>
			</div>
		<% end_loop %>
	</div>
</main>
