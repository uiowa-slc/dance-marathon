<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="col-xl-10 col-xl-offset-1">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
			</section>
		</div>
	</div>
	<div class="row">
		<div class="col-xl-12">

			<div class="flexslider history">
				<ul class="slides history__list">
					<% loop $Photos %>
						<li>
							<img src="$Photo.FocusFill(1140,700).URL" alt="$Photo.Title">
						</li>
					<% end_loop %>
				</ul>
			</div>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

