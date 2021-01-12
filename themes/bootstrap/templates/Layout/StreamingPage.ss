<% include Header %>

<!-- Photo Image Feature -->
<% if $Photo %>
    <% include FeaturedImage %>
<% end_if %>

<main class="container-xl my-3 my-md-5">
    <div class="row">        
		<div class="col-12">
			<article id="content">
                $Content
                $Form
                $PageComments
                <% with Page("home") %>
                    <% if $StreamHeader %>
                        <h1 class="stream-header">$StreamHeader</h1>
                    <% else %>
                        <h1 class="stream-header">Livestream from the IMU:</h1>
                    <% end_if %>
                    <% if $StreamCode %>
                        $StreamCode.RAW
                    <% else %>
                        <script src="https://cdn.jwplayer.com/players/z2z9XSYM-7EaCFiXK.js"></script>
                    <% end_if %>
                  <% end_with %>
                <div class="share-sheet">
                    <br />
                    <p class="share-sheet__text">Share:
                        <a href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u={$absoluteBaseURL}stream', '_blank', 'width=400,height=500');void(0);" rel="noopener noreferrer">
                            <i class="fab fa-facebook-square fa-2x pr-2 align-middle"></i>
                            <span class="sr-only">Facebook</span>
                        </a>
                        <a href="https://twitter.com/intent/tweet?text={$absoluteBaseURL}stream" target="_blank" rel="noopener noreferrer">
                            <i class="fab fa-twitter-square fa-2x pr-2 align-middle"></i>
                            <span class="sr-only">Twitter</span>
                        </a>
                    </p>
                    <p class="text-center"><a href="{$absoluteBaseURL}stream">Permanent link</a></p>
                </div>
			</article>
		</div>
	</div>
</main>




