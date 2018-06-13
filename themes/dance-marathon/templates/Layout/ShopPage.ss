<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">
		<!-- Side Bar -->
		<%-- <% if $Children || $Parent %>
			<div class="col-lg-4 col-lg-push-8 sidebar">
				<% include SideNav %>
			</div>
		<% end_if %> --%>

		<div class="col-md-12">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
				<hr />
				<!-- Loop Shop Items -->
				<% if $ShopItems %>
					<ul class="shoplist">
						<% loop $ShopItems %>
							<li class="shoplist__item <% if $ShopURL %>shoplist__item--link<% end_if %>">
								<% if $Image %>
									<a href="$Image.PaddedImage(700,700).URL" class="lightbox" title="$Title">
										<img src="$Image.PaddedImage(270,270).URL" alt="$Title" class="shoplist__img">
									</a>
								<% end_if %>
								<p class="shoplist__title"><strong>$Title</strong></p>
								<% if $Price %>
									<p class="shoplist__price">$$Price</p>
								<% end_if %>
								<% if $ShopURL %>
									<a href="$ShopURL" class="shoplist__btn" target="_blank">Shop Online</a>
								<% end_if %>
							</li>
						<% end_loop %>
					</ul>
				<% end_if %>
				<!-- end Loop Shop Items -->
			</section>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->