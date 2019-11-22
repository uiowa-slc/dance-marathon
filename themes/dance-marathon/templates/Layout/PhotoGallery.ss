<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="col-xl-10 col-xl-offset-1">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
				<div class="flexslider">
					<ul class="slides">
						<% loop $PhotoEntries %>
							<li>
								<img src="$Photo.ScaleWidth(940).URL" alt="$Title">
							</li>
						<% end_loop %>
					</ul>
				</div>

			</section>
			<% include ChildPages %>
		</div><!-- end .col -->
	</div><!-- end .row -->
</main><!-- end .container -->

