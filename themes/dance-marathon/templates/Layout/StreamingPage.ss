<% include HeaderPhoto %>
<main class="container--stream" role="main">

	<div class="row">
		<!-- Main Content -->
		<div class="col-md-12">
			<section id="main-content" tabindex="-1">
		
				<% with Page("home") %>
				  <% if $StreamHeader %>
				  <h1 class="stream-header">$StreamHeader</h1>
				  <% else %>
				  <h1 class="stream-header">Livestream from the IMU:</h1>
				  <% end_if %>
				  <% if $StreamCode %>
				  	$StreamCode
				  <% else %>
				  	<script src="//content.jwplatform.com/players/tO9PdlBo-7EaCFiXK.js"></script>
				  <% end_if %>
				<% end_with %>
				<div class="share-sheet">
					<p class="share-sheet__text">Share:
						<a class="share-sheet__button share-sheet__button--fb icon-facebook" href="javascript:window.open('http://www.facebook.com/sharer/sharer.php?u={$absoluteBaseURL}stream', '_blank', 'width=400,height=500');void(0);" title="Facebook"></a>
						<a  href="https://twitter.com/intent/tweet?text={$absoluteBaseURL}stream" target="_blank" class="share-sheet__button share-sheet__button--twitter icon-twitter" title="Twitter"></a>
					</p>
				</div>
			</section>
			<% include ChildPages %>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

