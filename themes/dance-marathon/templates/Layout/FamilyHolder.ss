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
				<!-- Loop Family Members -->
				<ul class="familyholder">
					<% loop $Children %>
						<li class="familyholder__listitem">
							<% if $Photo %>
								<a href="$Link" class="familyholder__anchor">
									<img src="$Photo.CroppedImage(242,242).URL" alt="$Title" class="familyholder__img">
									<h4 class="familyholder__title">$Title</h4>
								</a>
							<% else %>
								<a href="$Link" class="familyholder__anchor">
									<img src="{$ThemeDir}/images/placeholder.png" alt="$Title" class="familyholder__img">
									<h4 class="familyholder__title">$Title</h4>
								</a>
							<% end_if %>
						</li>
					<% end_loop %>
				</ul>
				<!-- end Loop Family Members -->
			</section>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->