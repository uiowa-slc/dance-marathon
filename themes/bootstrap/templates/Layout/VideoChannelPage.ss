<% include Header %>

<!-- Photo Image Feature -->
<% if $Photo %>
    <% include FeaturedImage %>
<% end_if %>

<main class="container-xl my-3 my-md-5">
    <% if not $Photo %>
        <div class="row">
            <div class="col">
                <div class="content-header mb-4">
                    $Breadcrumbs
                    <h1>$Title</h1>
                </div>
            </div>
        </div>
    <% end_if %>
    <div class="row">
        <% if $Menu(2) %>
            <% include SideBar %>
        <% end_if %>
        
		<div class="<% if $Menu(2) %>col-lg-8 col-xl-9<% else %>col-md-10 offset-md-1<% end_if %>">
			<article id="content">
                $Content
                $Form
                $PageComments
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
			</article>
		</div>
	</div>
</main>
